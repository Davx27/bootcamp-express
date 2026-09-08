import type { Instrument, InstrumentSummary } from './types.js';

export function filterByCategory(
	items: Instrument[],
	categoryFilter: string | null,
): Instrument[] {
	if (categoryFilter === null) {
		return items;
	}

	const filteredItems = items.filter(
		(item) => item.category.toLowerCase() === categoryFilter.toLowerCase(),
	);

	if (filteredItems.length === 0) {
		const availableCategories = [...new Set(items.map((item) => item.category))];
		throw new Error(
			`No existe la categoría "${categoryFilter}". Categorías disponibles: ${availableCategories.join(', ')}`,
		);
	}

	return filteredItems;
}

export function calculateSummary(items: Instrument[]): InstrumentSummary {
	if (items.length === 0) {
		throw new Error('No hay instrumentos para calcular el resumen.');
	}

	const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
	const sortedByPrice = [...items].sort((first, second) => first.price - second.price);

	return {
		total: items.length,
		active: items.filter((item) => item.active).length,
		inactive: items.filter((item) => !item.active).length,
		averagePrice: Number((totalPrice / items.length).toFixed(2)),
		mostExpensive: sortedByPrice[sortedByPrice.length - 1],
		cheapest: sortedByPrice[0],
		categories: [...new Set(items.map((item) => item.category))],
	};
}
