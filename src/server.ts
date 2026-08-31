// src/server.ts — Entry point del servidor
// ============================================================
// TODO: Usar logger.info en lugar de console.log para los mensajes de inicio
//
// Pasos:
//   1. Importar logger desde './config/logger'
//   2. Reemplazar console.log por logger.info en el callback de app.listen
//   3. Opcional: cerrar prisma.$disconnect() en el graceful shutdown
// ============================================================


import { app } from './app.js';
import { logger } from './config/logger.js';
import { prisma } from './lib/prisma.js';

const PORT = Number(process.env['PORT']) || 3000;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  logger.info(`📘 Environment: ${process.env['NODE_ENV'] ?? 'development'}`);
});

// Graceful shutdown
const shutdown = async () => {
  logger.info('Shutting down server...');
  await prisma.$disconnect();
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);