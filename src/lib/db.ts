import fs from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

async function readCollection(name) {
  const p = path.join(dataDir, `${name}.json`);
  try {
    const raw = await fs.readFile(p, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

async function writeCollection(name, data) {
  const p = path.join(dataDir, `${name}.json`);
  await fs.writeFile(p, JSON.stringify(data, null, 2), "utf-8");
}

export const db = {
  async all(name) { return readCollection(name); },
  async findById(name, id) {
    const all = await readCollection(name);
    return all.find(r => r.id === id) ?? null;
  },
  async insert(name, item) {
    const all = await readCollection(name);
    all.push(item);
    await writeCollection(name, all);
    return item;
  },
  async update(name, id, patch) {
    const all = await readCollection(name);
    const idx = all.findIndex(r => r.id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...patch };
    await writeCollection(name, all);
    return all[idx];
  },
  async remove(name, id) {
    const all = await readCollection(name);
    const next = all.filter(r => r.id !== id);
    await writeCollection(name, next);
  }
};
