// src/schemas/items.schema.ts — Validación Zod para el recurso principal
// ============================================================
// TODO: Define el schema Zod para tu recurso según tu dominio
//
// Lineamientos:
//   - createItemSchema: todos los campos requeridos con validaciones
//   - updateItemSchema: todos opcionales (partial)
//   - Exportar tipos inferidos: CreateItemDto, UpdateItemDto
//
// Ejemplo — Biblioteca (libro):
//
// import { z } from 'zod';
//
// export const createItemSchema = z.object({
//   title:     z.string().min(1).max(200),
//   isbn:      z.string().regex(/^[0-9-]{10,17}$/, 'ISBN inválido'),
//   year:      z.number().int().min(1000).max(new Date().getFullYear()),
//   pages:     z.number().int().positive().optional(),
//   available: z.boolean().default(true),
//   authorId:  z.number().int().positive().optional(),
// });
//
// export const updateItemSchema = createItemSchema.partial();
//
// export type CreateItemDto = z.infer<typeof createItemSchema>;
// export type UpdateItemDto = z.infer<typeof updateItemSchema>;
// ============================================================

// src/schemas/items.schema.ts — Validación Zod para el recurso principal
import { z } from 'zod';

export const createItemSchema = z.object({
  sku: z
    .string({ message: 'El SKU es obligatorio' })
    .min(3, 'El SKU debe tener al menos 3 caracteres')
    .trim(),
  name: z
    .string({ message: 'El nombre es obligatorio' })
    .min(1, 'El nombre no puede estar vacío')
    .trim(),
  brand: z
    .string({ message: 'La marca es obligatoria' })
    .min(1, 'La marca no puede estar vacía')
    .trim(),
  price: z
    .number({ message: 'El precio debe ser un número' })
    .positive('El precio debe ser un valor positivo'),
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
  categoryId: z
    .string({ message: 'La categoría es obligatoria' })
    .uuid('El ID de categoría debe ser un UUID válido'),
});

export const updateItemSchema = createItemSchema.partial();

export const queryParamsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;