'use server';
import { db } from '@/lib/db';
export async function deleteLead(id) { await db.remove('leads', id); }
