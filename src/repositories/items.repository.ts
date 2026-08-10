// ============================================
// REPOSITORY — Capa de acceso a datos
// ============================================
// Reglas de esta capa:
// - Único punto de acceso al store (array, DB, archivo)
// - Todos los métodos deben ser async Promise<T>
// - Retornar copias defensivas (no la referencia interna)
// - Si no encuentra un elemento, retornar undefined

import { Item, CreateItemDto, UpdateItemDto } from '../types.js';

// Store inicializado con instrumentos musicales de prueba
const store: Item[] = [
  {
    id: 1,
    name: 'Guitarra Eléctrica Stratocaster',
    brand: 'Fender',
    salesCount: 12,
    rentalsCount: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Batería Acústica Stage Custom',
    brand: 'Yamaha',
    salesCount: 3,
    rentalsCount: 8,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Teclado Sintetizador Minilogue',
    brand: 'Korg',
    salesCount: 7,
    rentalsCount: 2,
    createdAt: new Date().toISOString(),
  },
];

let nextId = 4;

export async function findAll(): Promise<Item[]> {
  // Copia defensiva del array
  return store.map((item) => ({ ...item }));
}

export async function findById(id: number): Promise<Item | undefined> {
  const item = store.find((item) => item.id === id);
  if (!item) return undefined;
  // Copia defensiva del objeto encontrado
  return { ...item };
}

export async function create(dto: CreateItemDto): Promise<Item> {
  const item: Item = {
    id: nextId++,
    ...dto,
    createdAt: new Date().toISOString(),
  };
  store.push(item);
  // Copia defensiva
  return { ...item };
}

export async function update(id: number, dto: UpdateItemDto): Promise<Item | undefined> {
  const index = store.findIndex((item) => item.id === id);
  if (index === -1) return undefined;

  store[index] = { ...store[index]!, ...dto };
  // Copia defensiva del objeto actualizado
  return { ...store[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((item) => item.id === id);
  if (index === -1) return false;

  store.splice(index, 1);
  return true;
}