// ============================================
// TYPES — Dominio de Instrumentos Musicales
// ============================================

export interface Item {
  id: number;
  name: string;          // Nombre o modelo del instrumento (ej: "Guitarra Eléctrica Stratocaster")
  brand: string;         // Marca (ej: "Fender")
  salesCount: number;    // Unidades vendidas
  rentalsCount: number;  // Veces alquilado
  createdAt: Date;
}

// Tipos de respuesta genéricos — contratos del servidor
export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ValidationErrorResponse {
  error: string;
  message: string;
  issues: Array<{ field: string; message: string }>;
}

export interface ErrorResponse {
  error: string;
  message: string;
  stack?: string;
}