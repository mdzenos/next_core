'use server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

const CreateAccountSchema = z.object({
  name: z.string().min(1),
  industry: z.string().optional(),
  website: z.string().optional()
});

export async function createAccount(formData) {
  const values = Object.fromEntries(formData);
  const parsed = CreateAccountSchema.parse(values);
  const newAccount = { id: `acc-${uuidv4()}`, ...parsed };
  await db.insert('accounts', newAccount);
}
