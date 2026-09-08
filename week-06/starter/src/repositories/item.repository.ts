// ============================================
// REPOSITORY: Items (con populate de Category)
// TODO: Implementar las funciones CRUD con populate()
// ============================================

import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';
import { Item } from '../models/item.model';
import { AppError } from '../errors/AppError';
import type { CreateItemDto, UpdateItemDto } from '../schemas/item.schema';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export async function findAll(
  page: number,
  limit: number,
  search?: string,
): Promise<PaginatedResult<unknown>> {
  const skip = (page - 1) * limit;
  const filter = search ? { name: { $regex: search, $options: 'i' } } : {};

  const [data, total] = await Promise.all([
    Item.find(filter)
      .populate('category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Item.countDocuments(filter),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

export async function findById(id: string): Promise<unknown> {
  try {
    const item = await Item.findById(id).populate('category').lean();
    if (!item) {
      throw new AppError(404, 'Instrumento no encontrado');
    }
    return item;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de instrumento inválido');
    }
    throw err;
  }
}

export async function create(dto: CreateItemDto): Promise<unknown> {
  try {
    const newItem = await Item.create(dto);
    return newItem.toJSON();
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe un instrumento con ese SKU');
    }
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de referencia inválido');
    }
    throw err;
  }
}

export async function update(id: string, dto: UpdateItemDto): Promise<unknown> {
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    })
      .populate('category')
      .lean();

    if (!updatedItem) {
      throw new AppError(404, 'Instrumento no encontrado para actualizar');
    }

    return updatedItem;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe un instrumento con ese SKU');
    }
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de instrumento o categoría inválido');
    }
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const deletedItem = await Item.findByIdAndDelete(id).lean();
    if (!deletedItem) {
      throw new AppError(404, 'Instrumento no encontrado para eliminar');
    }
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de instrumento inválido');
    }
    throw err;
  }
}