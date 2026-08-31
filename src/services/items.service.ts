// src/services/items.service.ts — Lógica de negocio
// ============================================================
// TODO: Implementar el servicio que delega al repositorio
//
// src/services/items.service.ts — Lógica de negocio

import { AppError } from '../errors/AppError.js';
import { CreateItemDto, UpdateItemDto } from '../schemas/items.schema.js';
import { ItemsRepository } from '../repositories/items.repository.js';

const repo = new ItemsRepository();

export class ItemsService {
  async listItems(page: number, limit: number) {
    return await repo.findAll(page, limit);
  }

  async getItem(id: string) {
    const item = await repo.findById(id);

    if (!item) {
      throw new AppError(404, 'Instrumento no encontrado');
    }

    return item;
  }

  async createItem(data: CreateItemDto) {
    return await repo.create(data);
  }

  async updateItem(id: string, data: UpdateItemDto) {
    return await repo.update(id, data);
  }

  async deleteItem(id: string) {
    return await repo.remove(id);
  }
}