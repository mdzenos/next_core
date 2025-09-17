// app/leads/_actions/update.ts
"use server";

import { db } from '@/lib/db';
import { updateLeadSchema, UpdateLeadInput } from "../_schemas";
import { revalidatePath } from "next/cache";

// Lấy lead theo id
export async function getLeadById(id: string) {
  return db.findById('leads', id);
}

export async function updateLeadAction(raw: UpdateLeadInput) {
  const result = updateLeadSchema.safeParse(raw);

  if (!result.success) {
    return {
      ok: false,
      errors: result.error.flatten().fieldErrors, // gửi error cụ thể về client
    };
  }

  const lead = result.data;

  // Cập nhật DB
  await db.update("leads", lead.id, lead);

  revalidatePath("/leads");
  return { ok: true };
}
