"use server";

import { db } from "@/lib/db";
import { LeadInput } from "./schemas";
import { revalidatePath } from "next/cache";

// CREATE lead
export async function createLeadAction(data: LeadInput) {
  const lead = await db.insert("leads", data);
  return { ok: true, lead };
}

// GET leads
export async function getLeads() {
  return db.all("leads");
}

// GET lead by id
export async function getLeadById(id: string) {
  return db.findById("leads", id);
}

// UPDATE lead
export async function updateLeadAction(input: LeadInput) {
  await db.update("leads", input.id, input);
  return { ok: true };
}

// DELETE lead
export async function deleteLeadAction(id: string) {
  await db.remove("leads", id);
  revalidatePath("/leads");
}
