// app/leads/schemas.ts
import { z } from "zod";

// -----------------------------
// Schema Lead
// -----------------------------
export const leadSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  owner: z.string().min(1, "Owner is required"),
  status: z.string().optional(),
});

// -----------------------------
// Types
// -----------------------------
export type LeadInput = z.infer<typeof leadSchema>;

// -----------------------------
// Hàm validate + check unchanged (dành cho UPDATE)
// -----------------------------
export function validateAndCheckChanges(
  input: LeadInput,
  original: LeadInput
): { ok: true; data: LeadInput } | { ok: false; errors: Record<string, string[]> } {
  // Validate với schema
  const result = leadSchema.safeParse(input);
  if (!result.success) {
    return { ok: false, errors: result.error.flatten().fieldErrors };
  }

  const validated = result.data;

  // Check xem có thay đổi gì không
  const unchanged =
    validated.name === original.name &&
    validated.email === original.email &&
    validated.status === original.status &&
    validated.owner === original.owner;

  if (unchanged) {
    return { ok: false, errors: { _update: ["Không có thay đổi gì cần cập nhật!"] } };
  }

  return { ok: true, data: validated };
}
