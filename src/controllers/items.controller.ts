// src/controllers/items.controller.ts — Capa HTTP
// ============================================================
// TODO: Implementar los handlers del controlador
// src/controllers/items.controller.ts — Capa HTTP

// src/controllers/items.controller.ts — Capa HTTP

// src/controllers/items.controller.ts — Capa HTTP

import { Request, Response, NextFunction } from 'express';
import { ItemsService } from '../services/items.service.js';
import {
  createItemSchema,
  updateItemSchema,
  queryParamsSchema,
} from '../schemas/items.schema.js';

const service = new ItemsService();

export class ItemsController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsedQuery = queryParamsSchema.safeParse(req.query);
      
      const page = parsedQuery.success ? parsedQuery.data.page : 1;
      const limit = parsedQuery.success ? parsedQuery.data.limit : 10;

      const result = await service.listItems(page, limit);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'] as string;
      const item = await service.getItem(id);
      res.json(item);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validation = createItemSchema.safeParse(req.body);

      if (!validation.success) {
        res.status(400).json({
          status: 'error',
          message: 'Error de validación en los datos ingresados',
          errors: validation.error.flatten().fieldErrors,
        });
        return;
      }

      const newItem = await service.createItem(validation.data);
      res.status(201).json(newItem);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'] as string;
      const validation = updateItemSchema.safeParse(req.body);

      if (!validation.success) {
        res.status(400).json({
          status: 'error',
          message: 'Error de validación en los datos ingresados',
          errors: validation.error.flatten().fieldErrors,
        });
        return;
      }

      const updatedItem = await service.updateItem(id, validation.data);
      res.json(updatedItem);
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'] as string;
      await service.deleteItem(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}