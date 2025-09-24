// app/src/lib/makeFetch.ts
export type HttpMethod =
	| "GET"
	| "POST"
	| "PUT"
	| "PATCH"
	| "DELETE"
	| "HEAD"
	| "OPTIONS";

export type ApiRequestInit = Omit<RequestInit, "method"> & {
	method?: HttpMethod;
	json?: unknown;
	searchParams?: Record<string, any>; // 🔥 thêm query params
	timeout?: number;
	baseUrl?: string;
	retry?: number;
	stream?: boolean;
};

export class ApiError extends Error {
	status: number;
	statusText: string;
	url: string;
	body?: unknown;
	method?: HttpMethod;
	attempt?: number;

	constructor(
		message: string,
		opts: {
			status: number;
			statusText?: string;
			url?: string;
			body?: unknown;
			method?: HttpMethod;
			attempt?: number;
		}
	) {
		super(message);
		this.name = "ApiError";
		this.status = opts.status ?? 0;
		this.statusText = opts.statusText ?? "";
		this.url = opts.url ?? "";
		this.body = opts.body;
		this.method = opts.method;
		this.attempt = opts.attempt;
	}
}

function resolveUrl(path: string, baseCandidate: string): string {
	const p = String(path ?? "").trim();
	if (!p) throw new Error("apiFetch: empty path");
	if (/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(p)) return p;
	if (p.startsWith("//")) {
		try {
			const baseProto = baseCandidate
				? new URL(baseCandidate).protocol
				: typeof window !== "undefined"
					? window.location.protocol
					: "https:";
			return baseProto + p;
		} catch {
			return "https:" + p;
		}
	}
	try {
		const base =
			baseCandidate ||
			(typeof window !== "undefined"
				? window.location.origin
				: "http://localhost:3000");
		return new URL(p, base).toString();
	} catch {
		const cleanedBase = (baseCandidate || "http://localhost:3000").replace(
			/\/+$/,
			""
		);
		const cleanedPath = p.replace(/^\/+/, "");
		return `${cleanedBase}/${cleanedPath}`;
	}
}

function getDefaultBaseUrl(isServer: boolean) {
	if (isServer) {
		return (
			process.env.API_BASE_URL ??
			process.env.NEXT_PUBLIC_API_BASE_URL ??
			"http://localhost:3000"
		);
	} else {
		return (
			process.env.NEXT_PUBLIC_API_BASE_URL ??
			(typeof window !== "undefined" ? window.location.origin : "")
		);
	}
}

function backoffDelay(attempt: number) {
	const base = 200 * attempt;
	const jitter = Math.floor(Math.random() * 100);
	return base + jitter;
}

export async function apiFetch<T = any>(
	path: string,
	init: ApiRequestInit = {}
): Promise<T> {
	const isServer = typeof window === "undefined";
	const {
		json: jsonBody,
		searchParams,
		timeout,
		baseUrl: overrideBase,
		retry = 0,
		stream = false,
		method = "GET",
		...fetchInit
	} = init;

	let url = resolveUrl(path, overrideBase ?? getDefaultBaseUrl(isServer));

	// 🔥 xử lý searchParams
	if (searchParams) {
		const query = new URLSearchParams(searchParams as any).toString();
		url += (url.includes("?") ? "&" : "?") + query;
	}

	// method
	const upperMethod = method.toUpperCase() as HttpMethod;
	const allowed: HttpMethod[] = [
		"GET",
		"POST",
		"PUT",
		"PATCH",
		"DELETE",
		"HEAD",
		"OPTIONS",
	];
	if (!allowed.includes(upperMethod)) {
		throw new Error(`Invalid HTTP method: ${method}`);
	}

	// headers + body
	const headers = new Headers(fetchInit.headers ?? {});
	let body = fetchInit.body ?? undefined;

	const isFormData =
		typeof FormData !== "undefined" && body instanceof FormData;
	const isURLSearchParams =
		typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams;

	if (jsonBody !== undefined) {
		if (!isFormData && !isURLSearchParams && !(body instanceof Blob)) {
			if (!headers.has("Content-Type"))
				headers.set("Content-Type", "application/json;charset=utf-8");
			body = JSON.stringify(jsonBody);
		}
	} else if (
		body &&
		typeof body === "object" &&
		!isFormData &&
		!isURLSearchParams &&
		!(body instanceof Blob) &&
		!(typeof body === "string")
	) {
		if (!headers.has("Content-Type"))
			headers.set("Content-Type", "application/json;charset=utf-8");
		body = JSON.stringify(body);
	}

	if (!headers.has("Accept")) headers.set("Accept", "*/*");

	let attempt = 0;
	while (true) {
		attempt++;
		const controller = new AbortController();
		const externalSignal = (fetchInit as any).signal as AbortSignal | undefined;
		const cleanup: (() => void)[] = [];

		if (externalSignal) {
			if (externalSignal.aborted) controller.abort();
			else {
				const onAbort = () => controller.abort();
				externalSignal.addEventListener("abort", onAbort, { once: true });
				cleanup.push(() =>
					externalSignal.removeEventListener("abort", onAbort)
				);
			}
		}

		let timeoutId: ReturnType<typeof setTimeout> | undefined;
		if (timeout && timeout > 0) {
			timeoutId = setTimeout(() => controller.abort(), timeout);
		}

		try {
			const res = await fetch(url, {
				...fetchInit,
				method: upperMethod,
				headers,
				body,
				signal: controller.signal,
			});

			if (timeoutId) clearTimeout(timeoutId);
			cleanup.forEach((fn) => fn());

			if (stream) return res as unknown as T;

			const ct = (res.headers.get("content-type") || "").toLowerCase();

			if (!res.ok) {
				let parsedBody: unknown;
				try {
					if (/\bjson\b/.test(ct)) parsedBody = await res.json();
					else parsedBody = await res.text();
				} catch {
					parsedBody = undefined;
				}
				throw new ApiError(`HTTP ${res.status} ${res.statusText}`, {
					status: res.status,
					statusText: res.statusText,
					url,
					body: parsedBody,
					method: upperMethod,
					attempt,
				});
			}

			if (res.status === 204) return undefined as unknown as T;

			if (/\bjson\b/.test(ct)) return (await res.json()) as T;
			if (ct.startsWith("text/") || ct.includes("charset"))
				return (await res.text()) as unknown as T;
			if (
				ct.includes("application/octet-stream") ||
				ct.includes("application/pdf") ||
				ct.includes("image/") ||
				ct.includes("zip") ||
				ct.includes("audio/") ||
				ct.includes("video/")
			) {
				return (await res.arrayBuffer()) as unknown as T;
			}
			const text = await res.text();
			try {
				return JSON.parse(text) as T;
			} catch {
				return text as unknown as T;
			}
		} catch (error: any) {
			if (timeoutId) clearTimeout(timeoutId);
			cleanup.forEach((fn) => fn());

			if (error instanceof ApiError) throw error;

			if (error?.name === "AbortError") {
				const isTimeoutAbort = timeoutId !== undefined;
				if (isTimeoutAbort && attempt <= retry) {
					await new Promise((r) => setTimeout(r, backoffDelay(attempt)));
					continue;
				}
				throw new ApiError(
					isTimeoutAbort
						? `Request timed out after ${timeout}ms`
						: "Request aborted by caller",
					{
						status: 0,
						statusText: "AbortError",
						url,
						method: upperMethod,
						attempt,
					}
				);
			}

			if (attempt <= retry) {
				await new Promise((r) => setTimeout(r, backoffDelay(attempt)));
				continue;
			}
			throw new ApiError(error?.message ?? "Network error", {
				status: 0,
				statusText: "NetworkError",
				url,
				method: upperMethod,
				attempt,
			});
		}
	}
}

export const api = {
	get: <T = any>(path: string, init?: Omit<ApiRequestInit, "method">) =>
		apiFetch<T>(path, { ...init, method: "GET" }),
	post: <T = any>(
		path: string,
		body?: unknown,
		init?: Omit<ApiRequestInit, "method" | "body" | "json">
	) => apiFetch<T>(path, { ...init, method: "POST", json: body }),
	put: <T = any>(
		path: string,
		body?: unknown,
		init?: Omit<ApiRequestInit, "method" | "body" | "json">
	) => apiFetch<T>(path, { ...init, method: "PUT", json: body }),
	patch: <T = any>(
		path: string,
		body?: unknown,
		init?: Omit<ApiRequestInit, "method" | "body" | "json">
	) => apiFetch<T>(path, { ...init, method: "PATCH", json: body }),
	delete: <T = any>(path: string, init?: Omit<ApiRequestInit, "method">) =>
		apiFetch<T>(path, { ...init, method: "DELETE" }),
};

