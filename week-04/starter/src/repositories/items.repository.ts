// ============================================
// REPOSITORY — capa de acceso a datos (en memoria)
// ============================================
// Capa de repositorio: acceso y gestión de datos en memoria para instrumentos musicales

import { Item } from '../types.js';

export type CreateItemRepoDto = Omit<Item, 'id' | 'createdAt'>;
export type UpdateItemRepoDto = Partial<CreateItemRepoDto>;

// Registros iniciales de prueba para el dominio
let items: Item[] = [
  {
    id: 1,
    name: 'Guitarra Eléctrica Stratocaster',
    brand: 'Fender',
    salesCount: 12,
    rentalsCount: 5,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'Batería Acústica Stage Custom',
    brand: 'Yamaha',
    salesCount: 3,
    rentalsCount: 8,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: 'Teclado Sintetizador Minilogue',
    brand: 'Korg',
    salesCount: 7,
    rentalsCount: 2,
    createdAt: new Date(),
  },
];

let nextId = 4;

// Retorna copia defensiva del array completo
export async function findAll(): Promise<Item[]> {
  return items.map((item) => ({ ...item }));
}

// Busca por ID y retorna copia defensiva del recurso o undefined
export async function findById(id: number): Promise<Item | undefined> {
  const item = items.find((i) => i.id === id);
  if (!item) return undefined;
  return { ...item };
}

// Crea un nuevo instrumento asignando ID autoincremental y fecha actual
export async function create(dto: CreateItemRepoDto): Promise<Item> {
  const newItem: Item = {
    id: nextId++,
    ...dto,
    createdAt: new Date(),
  };
  items.push(newItem);
  return { ...newItem };
}

// Aplica los cambios sobre un registro existente y devuelve su copia
export async function update(id: number, dto: UpdateItemRepoDto): Promise<Item | undefined> {
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return undefined;

  items[index] = { ...items[index]!, ...dto };
  return { ...items[index]! };
}

// Elimina el elemento por ID y confirma si se realizó la operación
export async function remove(id: number): Promise<boolean> {
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return false;

  items.splice(index, 1);
  return true;
}