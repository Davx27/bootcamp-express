// ============================================
// REPOSITORY: Categories
// TODO: Implementar las funciones CRUD
// ============================================

import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';
import { Category } from '../models/category.model';
import { AppError } from '../errors/AppError';
import type { CreateCategoryDto, UpdateCategoryDto } from '../schemas/category.schema';

export async function findAll(): Promise<unknown[]> {
  return Category.find().sort({ name: 1 }).lean();
}

export async function findById(id: string): Promise<unknown> {
  try {
    const category = await Category.findById(id).lean();
    if (!category) {
      throw new AppError(404, 'Categoría no encontrada');
    }
    return category;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de categoría inválido');
    }
    throw err;
  }
}

export async function create(dto: CreateCategoryDto): Promise<unknown> {
  try {
    const newCategory = await Category.create(dto);
    return newCategory.toObject();
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe una categoría con ese nombre');
    }
    throw err;
  }
}

export async function update(id: string, dto: UpdateCategoryDto): Promise<unknown> {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedCategory) {
      throw new AppError(404, 'Categoría no encontrada para actualizar');
    }

    return updatedCategory;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe una categoría con ese nombre');
    }
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de categoría inválido');
    }
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const deletedCategory = await Category.findByIdAndDelete(id).lean();
    if (!deletedCategory) {
      throw new AppError(404, 'Categoría no encontrada para eliminar');
    }
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de categoría inválido');
    }
    throw err;
  }
}