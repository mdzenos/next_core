export async function api(path: string, options?: RequestInit) {
	const full_path = process.env.NEXT_PUBLIC_API_BASE_URL
		? process.env.NEXT_PUBLIC_API_BASE_URL + '/' + path
		: path;
	const res = await fetch(full_path, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...options?.headers,
		},
	});
	if (!res.ok) throw new Error(`API error: ${res.status}`);
	return res.json();
}
