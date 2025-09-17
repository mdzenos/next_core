'use server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

const CreateLeadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  owner: z.string().optional()
});

export async function createLead(formData) {
  const values = Object.fromEntries(formData);
  const parsed = CreateLeadSchema.parse(values);
  const newLead = { id: `lead-${uuidv4()}`, status: 'new', ...parsed };
  await db.insert('leads', newLead);
}
