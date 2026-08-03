import { createApp } from './app.js';

const PORT = process.env.PORT ?? '3000';
const app = createApp();

// Guardamos la referencia del servidor HTTP
const server = app.listen(Number(PORT), () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Función para manejar el apagado controlado (Graceful Shutdown)
function shutdown(signal: string) {
  console.log(`\nRecibida señal ${signal}. Cerrando el servidor limpiamente...`);

  server.close(() => {
    console.log('Servidor HTTP cerrado. Proceso finalizado.');
    process.exit(0);
  });

  // Timeout de seguridad: si tarda más de 10 segundos, fuerza el cierre
  setTimeout(() => {
    console.error('Cierre forzado por timeout.');
    process.exit(1);
  }, 10000);
}

// Escuchar eventos de terminación del sistema (Ctrl+C y señales de proceso)
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));