// ============================================
// MIDDLEWARES — errorHandler (4 parámetros)
// ============================================

// Gestor global de errores de la aplicación (4 parámetros requeridos por Express)

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError.js';
import { logger } from '../config/logger.js';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // 1. Errores de validación provocados por Zod
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation Error',
      message: 'Error de validación en los datos de la petición',
      issues: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
    return;
  }

  // 2. Errores operacionales controlados de la aplicación (AppError)
  if (err instanceof AppError) {
    logger.warn(`AppError [${err.statusCode}]: ${err.message}`);
    res.status(err.statusCode).json({
      error: 'Application Error',
      message: err.message,
    });
    return;
  }

  // 3. Errores no no controlados del servidor (500)
  const isProduction = process.env['NODE_ENV'] === 'production';
  const errorMessage = err instanceof Error ? err.message : 'Error interno no controlado';
  const errorStack = err instanceof Error ? err.stack : undefined;

  logger.error(`Unhandled Error: ${errorMessage}`, { stack: errorStack });

  res.status(500).json({
    error: 'Internal Server Error',
    message: isProduction ? 'Ha ocurrido un error inesperado en el servidor' : errorMessage,
    ...(isProduction ? {} : { stack: errorStack }),
  });
}