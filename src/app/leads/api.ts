import { makeCrudApi } from "!lib/makeApi";
import { api } from "!lib/makeFetch";
import { Lead, LeadInput } from "./schemas";

const module = "/products";

export const leadsApi = makeCrudApi<
	Lead,
	LeadInput,
	{
		approve: (baseUrl: string) => (id: number) => Promise<any>;
		reject: (baseUrl: string) => (id: number) => Promise<any>;
		getPage: (
			baseUrl: string
		) => (params: { pageIndex: number; pageSize: number; sort?: string }) => Promise<{
			data: Lead[];
			total: number;
		}>;
	}
>(module, {
	importExport: true,
	bulk: true,
	files: true,
	softDelete: true,
	history: true,
	pagination: true,
	custom: {
		approve: (baseUrl) => (id: number) =>
			api.post(`${baseUrl}/${id}/approve`, {}),
		reject: (baseUrl) => (id: number) =>
			api.post(`${baseUrl}/${id}/reject`, {}),
		getPage: (baseUrl) => (params) =>
			api.get(`${baseUrl}`, { searchParams: params }),
	},
});
