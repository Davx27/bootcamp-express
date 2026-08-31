// src/app.ts — Configuración de la aplicación Express
// ============================================================
// TODO: Registrar el router de tu recurso
//
// 1. Importar el router: import itemsRouter from './routes/items.routes';
// 2. Registrarlo bajo la ruta correcta para tu dominio:
//    app.use('/api/v1/books', itemsRouter);    // Biblioteca
//    app.use('/api/v1/medications', itemsRouter); // Farmacia
//    app.use('/api/v1/members', itemsRouter);  // Gimnasio
//    (adapta según tu dominio)
// ============================================================

import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';
import itemsRouter from './routes/items.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Registrar el router de instrumentos bajo /api/v1/items
app.use('/api/v1/items', itemsRouter);

app.use(notFound);
app.use(errorHandler);

export { app };