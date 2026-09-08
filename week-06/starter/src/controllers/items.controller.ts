// ============================================
// CONTROLLER: Items
// TODO: Implementar handlers req/res
// ============================================

import { Request, Response, NextFunction } from 'express';
import * as service from '../services/item.service';
import {
  createItemSchema,
  updateItemSchema,
  objectIdSchema,
} from '../schemas/item.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query['page']) || 1;
    const limit = Number(req.query['limit']) || 10;
    const search = req.query['search'] as string | undefined;

    const result = await service.getAll(page, limit, search);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    const item = await service.getById(id);
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createItemSchema.parse(req.body);
    const newItem = await service.createItem(dto);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    const dto = updateItemSchema.parse(req.body);
    const updatedItem = await service.updateItem(id, dto);
    res.json(updatedItem);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    await service.deleteItem(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}