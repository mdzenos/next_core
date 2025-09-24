// app/src/lib/makeApi.ts
import { api } from "!lib/makeFetch";

type ApiOptions<TInput, Custom extends Record<string, (baseUrl: string) => any> = {}> = {
	importExport?: boolean;
	bulk?: boolean;
	files?: boolean;
	softDelete?: boolean;
	history?: boolean;
	pagination?: boolean;
	custom?: Custom;
};

export function makeCrudApi<
	T,
	TInput = Partial<T>,
	Custom extends Record<string, (baseUrl: string) => any> = {}
>(
	baseUrl: string,
	options?: ApiOptions<TInput, Custom>
) {
	const core = {
		getAll: () => api.get<T[]>(baseUrl),
		getOne: (id: number | string) => api.get<T>(`${baseUrl}/${id}`),
		create: (data: TInput) => api.post<T>(baseUrl, data),
		update: (id: number | string, data: TInput) =>
			api.put<T>(`${baseUrl}/${id}`, data),
		delete: (id: number | string) => api.delete(`${baseUrl}/${id}`),
		search: (params: Record<string, any>) =>
			api.get<T[]>(`${baseUrl}/search`, { searchParams: params }),
	};

	const apiObj = {
		...core,
		...(options?.pagination && {
			getPage: (params: { pageIndex: number; pageSize: number; sort?: string }) =>
				api.get<{ data: T[]; total: number }>(baseUrl, { searchParams: params }),
		}),
		...(options?.importExport && {
			importFile: (file: File) => {
				const form = new FormData();
				form.append("file", file);
				return api.post<{ imported: number }>(`${baseUrl}/import`, form);
			},
			exportFile: () => api.get<Blob>(`${baseUrl}/export`, { stream: true }),
		}),
		...(options?.bulk && {
			bulkDelete: (ids: (number | string)[]) =>
				api.post(`${baseUrl}/bulk-delete`, { ids }),
			bulkUpdate: (ids: (number | string)[], data: Partial<TInput>) =>
				api.post(`${baseUrl}/bulk-update`, { ids, data }),
		}),
		...(options?.files && {
			uploadFile: (id: number | string, file: File) => {
				const form = new FormData();
				form.append("file", file);
				return api.post<{ url: string }>(`${baseUrl}/${id}/upload`, form);
			},
			uploadFiles: (id: number | string, files: File[]) => {
				const form = new FormData();
				files.forEach((f, i) => form.append(`files[${i}]`, f));
				return api.post<{ urls: string[] }>(`${baseUrl}/${id}/uploads`, form);
			},
			downloadFile: (id: number | string, fileId: string) =>
				api.get<Blob>(`${baseUrl}/${id}/files/${fileId}`, { stream: true }),
		}),
		...(options?.softDelete && {
			restore: (id: number | string) =>
				api.post(`${baseUrl}/${id}/restore`, {}),
		}),
		...(options?.history && {
			getHistory: (id: number | string) =>
				api.get<any[]>(`${baseUrl}/${id}/history`),
		}),
	} as const;

	type CustomImpl = {
		[K in keyof Custom]: ReturnType<Custom[K]>;
	};

	const custom = options?.custom
		? (Object.fromEntries(
			Object.entries(options.custom).map(([k, fn]) => [k, fn(baseUrl)])
		) as CustomImpl)
		: ({} as CustomImpl);

	return { ...apiObj, ...custom };
}

