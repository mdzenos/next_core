'use server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

const CreateContactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  companyId: z.string().optional()
});

export async function createContact(formData) {
  const values = Object.fromEntries(formData);
  const parsed = CreateContactSchema.parse(values);
  const newContact = { id: `contact-${uuidv4()}`, ...parsed };
  await db.insert('contacts', newContact);
}
