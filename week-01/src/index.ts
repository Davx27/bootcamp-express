import { readItems } from './reader.js';
import { filterByCategory, calculateSummary } from './processor.js';
import { writeReport } from './writer.js';
import type { Report } from './types.js';

const parseCategoryFilter = (): string | null => {
	const args = process.argv.slice(2);
	const categoryIndex = args.indexOf('--category');

	if (categoryIndex === -1) {
		return null;
	}

	const category = args[categoryIndex + 1];
	if (!category || category.startsWith('--')) {
		throw new Error('El argumento --category requiere un valor.');
	}

	return category;
};

async function main(): Promise<void> {
	try {
		const categoryFilter = parseCategoryFilter();
		const instruments = await readItems();
		const filteredInstruments = filterByCategory(instruments, categoryFilter);
		const summary = calculateSummary(filteredInstruments);
		const report: Report = {
			generatedAt: new Date().toISOString(),
			appliedFilter: categoryFilter,
			summary,
			items: filteredInstruments,
		};

		console.log(`Total: ${summary.total}`);
		console.log(`Activos: ${summary.active} | Inactivos: ${summary.inactive}`);
		console.log(`Precio promedio: $${summary.averagePrice}`);
		console.log(`Categorías: ${summary.categories.join(', ')}`);
		await writeReport(report);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error(`Error: ${message}`);
		process.exitCode = 1;
	}
}

void main();
