
// SERVER — Punto de entrada de la aplicación

import app from './app.js';
import { logger } from './config/logger.js';

// 1. Configuración del puerto desde variables de entorno con fallback a 3000
const PORT = process.env['PORT'] ? Number(process.env['PORT']) : 3000;

// 2. Iniciar el servidor HTTP escuchando en el puerto configurado
const server = app.listen(PORT, () => {
  // Reemplazamos console.log por logger.info para cumplir con los requisitos de logging
  logger.info(`Server running on http://localhost:${PORT}`);
});

// 3. Función para realizar un cierre controlado del servidor (Graceful Shutdown)
function shutdown(signal: string) {
  logger.warn(`Señal ${signal} recibida. Cerrando servidor de forma segura...`);
  
  // Deja de recibir nuevas peticiones HTTP y espera a terminar las existentes antes de apagar
  server.close(() => {
    logger.info('Servidor HTTP cerrado.');
    process.exit(0);
  });
}

// 4. Escuchar señales del sistema operativo para apagar el servidor limpiamente (SIGINT = Ctrl+C, SIGTERM = Cierre de proceso)
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));