// app/leads/schemas.ts
import { z } from "zod";

// -----------------------------
// Schema Lead (create)
// -----------------------------
export const leadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  rating: z.string().min(1, "Rating is required"),
});

// -----------------------------
// Schema Lead Update
// -----------------------------
export const leadUpdateSchema = leadSchema.extend({
  id: z.string().min(1, "ID is required"),
});

// -----------------------------
// Types
// -----------------------------
export type LeadInput = z.infer<typeof leadSchema>;
export type LeadUpdateInput = z.infer<typeof leadUpdateSchema>;

// -----------------------------
// Hàm validate + check unchanged (dành cho UPDATE)
// -----------------------------
export function validateAndCheckChanges(
  input: LeadUpdateInput,
  original: LeadUpdateInput
): { ok: true; data: LeadUpdateInput } | { ok: false; errors: Record<string, string[]> } {
  const result = leadUpdateSchema.safeParse(input);
  if (!result.success) {
    return { ok: false, errors: result.error.flatten().fieldErrors };
  }

  const validated = result.data;

  // Check thay đổi tự động theo field
  const unchanged = Object.keys(leadSchema.shape).every((key) => {
    return validated[key as keyof LeadUpdateInput] === original[key as keyof LeadUpdateInput];
  });

  if (unchanged) {
    return { ok: false, errors: { _update: ["Không có thay đổi gì cần cập nhật!"] } };
  }

  return { ok: true, data: validated };
}
