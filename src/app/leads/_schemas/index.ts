// app/leads/_schemas/index.ts
import { z } from "zod";

export const updateLeadSchema = z.object({
	id: z.string(),
	name: z.string().min(1, "Name is required"),
	email: z
		.string()
		.email("Invalid email"), // vẫn strict, không nới lỏng
	status: z.string(),
	owner: z.string(),
});

export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
