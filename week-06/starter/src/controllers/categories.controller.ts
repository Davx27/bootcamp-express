// ============================================
// CONTROLLER: Categories
// TODO: Implementar handlers req/res
// ============================================

import { Request, Response, NextFunction } from 'express';
import * as service from '../services/category.service';
import {
  createCategorySchema,
  updateCategorySchema,
} from '../schemas/category.schema';
import { objectIdSchema } from '../schemas/item.schema';

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const categories = await service.getAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    const category = await service.getById(id);
    res.json(category);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createCategorySchema.parse(req.body);
    const newCategory = await service.createCategory(dto);
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    const dto = updateCategorySchema.parse(req.body);
    const updatedCategory = await service.updateCategory(id, dto);
    res.json(updatedCategory);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    await service.deleteCategory(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}