import { promises as fs } from 'fs';
import path from 'path';

export async function readJsonFile<T>(relativePath: string): Promise<T> {
  const filePath = path.join(process.cwd(), relativePath);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent) as T;
}

export async function writeJsonFile<T>(
  relativePath: string,
  data: T
): Promise<void> {
  const filePath = path.join(process.cwd(), relativePath);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
