// ============================================
// MIDDLEWARES — notFound
// ============================================´

// Middleware para capturar rutas inexistentes (404) y canalizarlas al gestor de errores

import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';

export function notFound(req: Request, _res: Response, next: NextFunction): void {
  // Genera un error 404 operacional indicando el método y la ruta solicitada
  next(new AppError(404, `Ruta ${req.method} ${req.path} no encontrada`));
}