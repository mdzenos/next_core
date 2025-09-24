import { z } from "zod";

export const leadSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export type Lead = z.infer<typeof leadSchema> & { id: number };
export type LeadInput = z.infer<typeof leadSchema>;
