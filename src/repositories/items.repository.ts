// src/repositories/items.repository.ts — Acceso a datos con Prisma

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from '../lib/prisma.js';
import { AppError } from '../errors/AppError.js';
import { CreateItemDto, UpdateItemDto } from '../schemas/items.schema.js';

export class ItemsRepository {
  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.item.findMany({
        skip,
        take: limit,
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.item.count(),
    ]);

    return { data, total, page, limit };
  }

  async findById(id: string) {
    const item = await prisma.item.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    return item;
  }

  async create(data: CreateItemDto) {
    try {
      return await prisma.item.create({
        data,
        include: {
          category: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AppError(409, 'Ya existe un instrumento con ese valor (SKU)');
        }
        if (error.code === 'P2003') {
          throw new AppError(400, 'La categoría especificada no existe');
        }
      }
      throw error;
    }
  }

  async update(id: string, data: UpdateItemDto) {
    try {
      return await prisma.item.update({
        where: { id },
        data,
        include: {
          category: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new AppError(404, 'Instrumento no encontrado');
        }
        if (error.code === 'P2002') {
          throw new AppError(409, 'Ya existe un instrumento con ese valor (SKU)');
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await prisma.item.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new AppError(404, 'Instrumento no encontrado');
        }
      }
      throw error;
    }
  }
}