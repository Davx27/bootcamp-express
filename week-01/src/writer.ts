import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import type { Report } from './types.js';

export async function writeReport(report: Report): Promise<void> {
	const outputDirectory = join(import.meta.dirname, '..', 'output');
	const outputPath = join(outputDirectory, 'report.json');

	await mkdir(outputDirectory, { recursive: true });
	await writeFile(outputPath, JSON.stringify(report, null, 2), 'utf-8');
	console.log(`Reporte guardado en: ${outputPath}`);
}
