// ============================================
// CONTROLLER — Interfaz HTTP
// ============================================
// Reglas de esta capa:
// - Exactamente 3 pasos: extraer → llamar service → responder
// - Sin lógica de negocio (no ifs de dominio, no cálculos)
// - Maneja los 404 cuando el service retorna undefined
// - Siempre usar try/catch y pasar errores a next(err)

import { Request, Response, NextFunction } from 'express';
import * as service from '../services/items.service.js';
import { CreateItemDto, UpdateItemDto } from '../types.js';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Paso 1 — Extraer page y limit de req.query (con fallbacks 1 y 10)
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 10);

    // Paso 2 — Llamar service.findAll({ page, limit })
    const result = await service.findAll({ page, limit });

    // Paso 3 — Responder
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Paso 1 — Extraer id de req.params
    const id = Number(req.params.id);

    // Paso 2 — Llamar service.findById(id)
    const item = await service.findById(id);

    // Paso 3 — Responder según resultado
    if (!item) {
      res.status(404).json({
        error: 'Not Found',
        message: `Item ${id} not found`,
      });
      return;
    }

    res.status(200).json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Paso 1 — Extraer dto del req.body
    const dto = req.body as CreateItemDto;

    // Paso 2 — Llamar service.create(dto)
    const item = await service.create(dto);

    // Paso 3 — Responder 201 Created
    res.status(201).json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Paso 1 — Extraer id de params y dto del body
    const id = Number(req.params.id);
    const dto = req.body as UpdateItemDto;

    // Paso 2 — Llamar service.update(id, dto)
    const updated = await service.update(id, dto);

    // Paso 3 — Responder según resultado
    if (!updated) {
      res.status(404).json({
        error: 'Not Found',
        message: `Item ${id} not found`,
      });
      return;
    }

    res.status(200).json({ data: updated });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Paso 1 — Extraer id de params
    const id = Number(req.params.id);

    // Paso 2 — Llamar service.remove(id)
    const deleted = await service.remove(id);

    // Paso 3 — Responder según resultado
    if (!deleted) {
      res.status(404).json({
        error: 'Not Found',
        message: `Item ${id} not found`,
      });
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}