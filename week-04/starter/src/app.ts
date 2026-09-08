// ============================================
// APP — configuración de Express
// Registra middlewares, rutas y manejo de errores
// en el ORDEN CORRECTO.
// ============================================

// Configuración de la aplicación Express y orden de middlewares

// src/app.ts

import express from 'express';
import { morganMiddleware } from './config/logger.js';
import itemsRouter from './routes/items.routes.js'; // <- Corregido (sin llaves)
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// Middlewares globales
app.use(express.json());
app.use(morganMiddleware);

// Endpoint de verificación
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Rutas del dominio
app.use('/api/v1/items', itemsRouter);

// Manejo de 404 y errores
app.use(notFound);
app.use(errorHandler);

export default app;