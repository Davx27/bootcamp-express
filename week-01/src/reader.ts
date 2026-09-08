// ============================================
// READER — Lee el archivo de datos JSON
// ============================================

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Instrument } from './types.js';

export async function readItems(): Promise<Instrument[]> {
	const filePath = join(import.meta.dirname, '..', 'data', 'items.json');

	try {
		const raw = await readFile(filePath, 'utf-8');
		return JSON.parse(raw) as Instrument[];
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		throw new Error(`No se pudo leer el archivo de instrumentos: ${message}`);
	}
}
