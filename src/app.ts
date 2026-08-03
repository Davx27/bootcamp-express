import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express';
import { itemsRouter } from './routes/items.routes.js';

export function createApp(): Application {
  const app = express();

  // 1. express.json() — parseo de body (requerido para POST/PUT)
  app.use(express.json());

  // 2. Logger personalizado — registra método, URL, status y tiempo de ejecución
  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    });
    next();
  });

  // 3. Health check
  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  // 4. Rutas del recurso principal
  app.use('/api/v1/items', itemsRouter);

  // 5. Handler para rutas no encontradas (404)
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
  });

  // 6. Error handler global — SIEMPRE el último app.use() (requiere 4 parámetros)
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled Error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
}