'use server';
import { z } from 'zod';
import { db } from '@/lib/db';

// Schema validate dữ liệu update
const UpdateLeadSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email().optional(),
  status: z.enum(['new','contacted','qualified','lost']).optional(),
  owner: z.string().optional()
});

// Lấy dữ liệu lead theo id (dùng trong update page)
export async function getLeadById(id: string) {
  const lead = await db.findById('leads', id);
  if (!lead) throw new Error('Lead not found');
  return lead;
}

// Action cập nhật lead
export async function updateLeadAction(formData: FormData | Record<string, any>) {
  // Nếu là FormData, convert sang object
  const values = formData instanceof FormData ? Object.fromEntries(formData) : formData;

  // Validate bằng Zod
  const parsed = UpdateLeadSchema.parse(values);

  // Cập nhật DB
  const updated = await db.update('leads', parsed.id, parsed);
  if (!updated) throw new Error('Lead not found');

  return updated;
}
