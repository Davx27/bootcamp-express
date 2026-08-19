// ============================================
// CONFIG — logger de Winston + stream para Morgan
// ============================================
// Configuración de logger centralizado con Winston e integración de Morgan para peticiones HTTP

import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';

const isDev = process.env['NODE_ENV'] !== 'production';

// Formato visual personalizado para entorno de desarrollo
const devFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
);

// Formato JSON estructurado para producción
const prodFormat = format.combine(
  format.timestamp(),
  format.json()
);

// Instancia global del logger Winston
export const logger = createLogger({
  level: isDev ? 'http' : 'warn',
  format: isDev ? devFormat : prodFormat,
  transports: [
    new transports.Console(),
    ...(!isDev ? [new transports.File({ filename: 'logs/error.log', level: 'error' })] : []),
  ],
});

// Stream para redirigir las trazas de Morgan hacia el nivel http de Winston
export const morganStream = {
  write: (message: string) => logger.http(message.trim()),
};

// Middleware de Morgan adaptado según el entorno de ejecución
const morganFormat = isDev ? 'dev' : 'combined';
export const morganMiddleware = morgan(morganFormat, { stream: morganStream });