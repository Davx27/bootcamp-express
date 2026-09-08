// ============================================
// SERVICE: Items
// TODO: Implementar — delega al repositorio
// ============================================

import * as repo from '../repositories/item.repository';
import type { CreateItemDto, UpdateItemDto } from '../schemas/item.schema';

export async function getAll(page: number, limit: number, search?: string) {
  return repo.findAll(page, limit, search);
}

export async function getById(id: string) {
  return repo.findById(id);
}

export async function createItem(dto: CreateItemDto) {
  return repo.create(dto);
}

export async function updateItem(id: string, dto: UpdateItemDto) {
  return repo.update(id, dto);
}

export async function deleteItem(id: string) {
  return repo.remove(id);
}
