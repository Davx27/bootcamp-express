// ============================================
// SCHEMAS — adapta al recurso de tu dominio
// ============================================

// TODO: adapta los campos a tu dominio asignado
// Ejemplo: si tu dominio es Biblioteca, usa title, author, isbn, stock
// Si es Farmacia: name, dosage, price, stock
// Si es Gimnasio: name, email, plan, etc.

// TODO: implementar createItemSchema con z.object() y validaciones apropiadas
// Requisitos mínimos:
// - Al menos 3 campos obligatorios con validaciones de tipo y rango
// - Al menos 1 campo con mensaje de error personalizado
// - Al menos 1 campo numérico con .positive() o .nonnegative()
// - Al menos 1 campo opcional o con .default()
// Definición de esquemas de validación Zod para el dominio de Instrumentos Musicales

// src/schemas/item.schema.ts

import { z } from 'zod';

export const createItemSchema = z.object({
  name: z
    .string({ message: 'El nombre del instrumento es obligatorio' })
    .min(1, 'El nombre no puede estar vacío')
    .trim(),
  brand: z
    .string({ message: 'La marca es obligatoria' })
    .min(1, 'La marca no puede estar vacía')
    .trim(),
  salesCount: z
    .number()
    .int('El número de ventas debe ser un entero')
    .nonnegative('Las ventas no pueden ser un valor negativo')
    .default(0),
  rentalsCount: z
    .number()
    .int('El número de alquileres debe ser un entero')
    .nonnegative('Los alquileres no pueden ser un valor negativo')
    .default(0),
});

export const updateItemSchema = createItemSchema.partial();

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;