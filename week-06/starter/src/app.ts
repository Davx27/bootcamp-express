// ============================================
// app.ts — Configuración de Express
// TODO: Actualizar las rutas según tu dominio
// ============================================
//
// Cambia los segmentos de URL a los nombres de tu dominio:
// Ejemplo para Biblioteca:
//   /api/v1/authors   y   /api/v1/books
// Ejemplo para Farmacia:
//   /api/v1/suppliers y   /api/v1/medicines

import express from 'express';
import categoryRouter from './routes/categories.routes';
import itemRouter from './routes/items.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/items', itemRouter);

app.use(notFound);
app.use(errorHandler);