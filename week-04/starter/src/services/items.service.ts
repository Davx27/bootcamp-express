// ============================================
// SERVICE — lógica de negocio
// ============================================

// Capa de servicio: gestiona las reglas de negocio y lanza errores operacionales (AppError)

import { Item, PaginatedResponse } from '../types.js';
import * as repo from '../repositories/items.repository.js';
import { AppError } from '../errors/AppError.js';

interface FindAllOptions {
  page: number;
  limit: number;
}

// Obtiene los elementos aplicando paginación offset
export async function findAll(opts: FindAllOptions): Promise<PaginatedResponse<Item>> {
  const { page, limit } = opts;
  const all = await repo.findAll();
  
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);

  return {
    data,
    total: all.length,
    page,
    limit,
  };
}

// Busca un elemento por ID o lanza un error 404
export async function findById(id: number): Promise<Item> {
  const item = await repo.findById(id);
  if (!item) {
    throw new AppError(404, `Item con ID ${id} no encontrado`);
  }
  return item;
}

// Crea un nuevo registro en el repositorio
export async function create(dto: repo.CreateItemRepoDto): Promise<Item> {
  return repo.create(dto);
}

// Verifica la existencia del recurso y actualiza sus datos
export async function update(id: number, dto: repo.UpdateItemRepoDto): Promise<Item> {
  await findById(id);
  const updated = await repo.update(id, dto);
  return updated!;
}

// Verifica la existencia del recurso y efectúa su eliminación
export async function remove(id: number): Promise<void> {
  await findById(id);
  await repo.remove(id);
}