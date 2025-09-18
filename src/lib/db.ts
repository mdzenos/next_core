// app/lib/db.ts

import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const dataDir = path.join(process.cwd(), "data");
// Ensure the data directory exists before any read/write operations
async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (e: any) {
    if (e.code !== 'EEXIST') throw e;
  }
}

// Initialize the data directory at module load time
await ensureDataDir();

async function readCollection(name: any) {
  const p = path.join(dataDir, `${name}.json`);
  try {
    const raw = await fs.readFile(p, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

async function writeCollection(name: any, data: any) {
  const p = path.join(dataDir, `${name}.json`);
  await fs.writeFile(p, JSON.stringify(data, null, 2), "utf-8");
}

export const db = {
  async all(name: any) { return readCollection(name); },

  async findById(name: any, id: any) {
    const all = await readCollection(name);
    return all.find(r => r.id === id) ?? null;
  },

  async insert(name: any, item: any) {
    const all = await readCollection(name);
    const newItem = {
      id: item.id ?? uuidv4(),
      ...item,
    };
    all.push(newItem);
    await writeCollection(name, all);
    return newItem;
  },

  async update(name: any, id: any, patch: any) {
    const all = await readCollection(name);
    const idx = all.findIndex(r => r.id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...patch };
    await writeCollection(name, all);
    return all[idx];
  },

  async remove(name: any, id: any) {
    const all = await readCollection(name);
    const next = all.filter(r => r.id !== id);
    await writeCollection(name, next);
  }
};
