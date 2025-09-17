import { db } from '@/lib/db';
export const leadService = {
  async getAll() { return await db.all('leads'); },
  async getById(id) { return await db.findById('leads', id); },
  async create(data) { return await db.insert('leads', data); },
  async update(id, patch) { return await db.update('leads', id, patch); }
};
