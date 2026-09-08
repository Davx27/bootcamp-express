// ============================================
// SCHEMA ZOD: Item (con referencia a Category)
// ============================================

import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const objectIdSchema = z.string().regex(objectIdRegex, 'ID inválido');

export const createItemSchema = z.object({
  sku: z.string().min(1, 'El SKU es requerido').trim(),
  name: z.string().min(1, 'El nombre es requerido').max(150, 'El nombre no puede exceder 150 caracteres').trim(),
  brand: z.string().min(1, 'La marca es requerida').trim(),
  price: z.number().min(0, 'El precio no puede ser negativo'),
  salesCount: z.number().int().min(0).optional().default(0),
  rentalsCount: z.number().int().min(0).optional().default(0),
  category: z.string().regex(objectIdRegex, 'ID de categoría inválido'),
});

export const updateItemSchema = createItemSchema.partial();

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>; 