// ============================================
// ERRORS — AppError (clase de errores operacionales)
// ============================================
// Clase para gestionar errores operacionales controlados en la aplicación

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Asegura que el prototipo sea el de AppError (necesario al extender clases nativas en TS)
    Object.setPrototypeOf(this, new.target.prototype);

    // Captura el stack trace omitiendo la llamada al constructor de esta clase
    Error.captureStackTrace(this, this.constructor);
  }
}

// Función helper tipo Type Guard para validar si un error es de tipo AppError
export function isAppError(err: unknown): err is AppError {
  return err instanceof AppError;
}