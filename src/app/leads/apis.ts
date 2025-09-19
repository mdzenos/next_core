// app/leads/apis.ts
import { api } from "@/lib/api-client";
import { Lead } from "@/types";

// Nếu đang giả lập API dùng "products", bạn có thể giữ nguyên.
// Khi làm thật, nên đổi thành "leads".
const MODULE = "products";

// -----------------------------
// Types
// -----------------------------

export type LeadInput = Omit<Lead, "id">;

// -----------------------------
// API calls
// -----------------------------
export async function getLeads(): Promise<Lead[]> {
	const data = await api(MODULE);
	// đảm bảo luôn trả về mảng
	return data.products ?? [];
}

export async function getLeadById(id: string): Promise<Lead | null> {
	try {
		return await api(`${MODULE}/${id}`);
	} catch {
		return null;
	}
}

export async function createLead(data: LeadInput): Promise<Lead> {
	return api(`${MODULE}`, {
		method: "POST",
		body: JSON.stringify(data),
	});
}


export async function updateLead(id: string, data: LeadInput): Promise<{ ok: boolean; data?: Lead; errors?: any }> {
	try {
		const res = await api(`${MODULE}/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		return { ok: true, data: res as Lead };
	} catch (error: any) {
		return {
			ok: false,
			errors: error?.message ?? "Failed to update lead",
		};
	}
}

export async function deleteLead(id: string): Promise<{ success: boolean }> {
	await api(`${MODULE}/${id}`, { method: "DELETE" });
	return { success: true };
}
