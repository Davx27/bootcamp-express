import type { Item, CreateItemDto, UpdateItemDto } from './types.js';

// Store en memoria — simula una base de datos sin persistencia
// Los datos se pierden al reiniciar el servidor (se usará BD a partir de week-05)
const items: Item[] = [
  {
    id: 1,
    name: 'Guitarra Eléctrica Stratocaster',
    brand: 'Fender',
    salesCount: 12,
    rentalsCount: 5,
  },
  {
    id: 2,
    name: 'Batería Acústica Stage Custom',
    brand: 'Yamaha',
    salesCount: 3,
    rentalsCount: 8,
  },
];

let nextId = 3;

// Retorna todos los instrumentos del array
export function getAll(): Item[] {
  return items;
}

// Retorna el instrumento con el id dado, o undefined si no existe
export function getById(id: number): Item | undefined {
  return items.find((item) => item.id === id);
}

// Crea un nuevo instrumento con un id autoincremental y lo guarda en el array
export function create(data: CreateItemDto): Item {
  const newItem: Item = { id: nextId++, ...data };
  items.push(newItem);
  return newItem;
}

// Actualiza el instrumento con el id dado y lo retorna, o undefined si no existe
export function update(id: number, data: UpdateItemDto): Item | undefined {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return undefined;
  }

  // Mantiene los datos anteriores y sobrescribe solo los campos que vienen en 'data'
  items[index] = { ...items[index], ...data };
  return items[index];
}

// Elimina el instrumento con el id dado y retorna true, o false si no existe
export function remove(id: number): boolean {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return false;
  }

  items.splice(index, 1);
  return true;
}