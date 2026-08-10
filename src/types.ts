// ============================================
// TYPES — Adapta estos tipos a tu dominio
// ============================================
// NOTA: Renombra "Item" por el recurso de tu dominio.
// Ejemplos: Book, Medicine, Member, Dish, Patient, Movie...
//
// Agrega o quita campos según las características de tu dominio.

// TODO: Renombra Item y ajusta los campos a tu dominio asignado
export interface Item {
  id: number;
  name: string;          // Modelo (ej: "Guitarra Eléctrica Stratocaster")
  brand: string;         // Marca (ej: "Fender")
  salesCount: number;    // Ventas registradas
  rentalsCount: number;  // Alquileres registrados
  createdAt: string;     // Fecha de creación ISO
}

// DTO para crear — sin campos auto-generados
export type CreateItemDto = Omit<Item, 'id' | 'createdAt'>;

// DTO para actualizar — todos los campos opcionales
export type UpdateItemDto = Partial<CreateItemDto>;

// Contratos de respuesta (no cambiar nombres — son genéricos)
export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
