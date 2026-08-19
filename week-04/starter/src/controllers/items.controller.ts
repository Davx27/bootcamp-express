// ============================================
// CONTROLLER — delgado, maneja req/res, llama service
// ============================================
// Controlador delgado: gestiona peticiones/respuestas, valida esquemas Zod e invoca el servicio

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as service from '../services/items.service.js';
import {
  createItemSchema,
  updateItemSchema,
  CreateItemDto,
  UpdateItemDto,
} from '../schemas/item.schema.js';
import { SingleResponse, PaginatedResponse } from '../types.js';

// Esquema de validación para el parámetro de ruta :id
const idSchema = z.coerce.number().int().positive({
  message: 'El id debe ser un número entero positivo',
});

// Helper para dar formato a los errores de validación de Zod
function formatIssues(error: z.ZodError): Array<{ field: string; message: string }> {
  return error.issues.map((issue) => ({
    field: issue.path.join('.') || 'id',
    message: issue.message,
  }));
}

// Obtiene el listado de recursos con paginación
export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query['page']) || 1;
    const limit = Number(req.query['limit']) || 10;
    const result = await service.findAll({ page, limit });
    res.json(result satisfies PaginatedResponse<(typeof result.data)[number]>);
  } catch (err) {
    next(err);
  }
}

// Obtiene un recurso específico por su ID
export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = idSchema.safeParse(req.params['id']);
    if (!parsed.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Parámetro inválido',
        issues: formatIssues(parsed.error),
      });
      return;
    }
    const item = await service.findById(parsed.data);
    res.json({ data: item } satisfies SingleResponse<typeof item>);
  } catch (err) {
    next(err);
  }
}

// Crea un nuevo recurso previa validación del cuerpo de la petición
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = createItemSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Datos de entrada inválidos',
        issues: formatIssues(result.error),
      });
      return;
    }
    const dto: CreateItemDto = result.data;
    const item = await service.create(dto);
    res.status(201).json({ data: item } satisfies SingleResponse<typeof item>);
  } catch (err) {
    next(err);
  }
}

// Actualiza un recurso existente validando ID y campos enviados
export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsedId = idSchema.safeParse(req.params['id']);
    if (!parsedId.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Parámetro inválido',
        issues: formatIssues(parsedId.error),
      });
      return;
    }

    const result = updateItemSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Datos de entrada inválidos',
        issues: formatIssues(result.error),
      });
      return;
    }
    const dto: UpdateItemDto = result.data;
    const item = await service.update(parsedId.data, dto);
    res.json({ data: item } satisfies SingleResponse<typeof item>);
  } catch (err) {
    next(err);
  }
}

// Elimina un recurso por su ID
export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = idSchema.safeParse(req.params['id']);
    if (!parsed.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Parámetro inválido',
        issues: formatIssues(parsed.error),
      });
      return;
    }
    await service.remove(parsed.data);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}