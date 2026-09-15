import { z } from 'zod';

// ============================================
// SCHEMA DEL RECURSO PRINCIPAL
// ============================================
// Adapta este schema al recurso de tu dominio asignado.
//
// Ejemplos:
// - Biblioteca: título, autor, ISBN, disponible (boolean)
// - Farmacia: nombre, principioActivo, stock (number), precio (number)
// - Gimnasio: fullName, plan ('basic'|'premium'|'vip'), expiresAt (date)
// - Restaurante: nombre, descripción, precio (number), categoría
// ============================================

// TODO: Define el schema de creación para tu recurso
// Ejemplo mínimo (adáptalo a tu dominio):
export const createResourceSchema = z.object({
  name: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres'),
  brand: z.string().trim().min(2, 'La marca debe tener al menos 2 caracteres'),
  category: z.enum(['strings', 'keyboards', 'drums', 'wind', 'audio', 'accessories']),
  description: z.string().trim().max(500).optional(),
  price: z.number().nonnegative('El precio no puede ser negativo'),
  stock: z.number().int().nonnegative('El stock no puede ser negativo'),
  condition: z.enum(['new', 'used']).default('new'),
  availableForSale: z.boolean().default(true),
  availableForRental: z.boolean().default(false),
});

// TODO: Define el schema de actualización (todos los campos opcionales)
// Usa .partial() para hacer todos los campos opcionales
export const updateResourceSchema = createResourceSchema.partial();

export type CreateResourceDto = z.infer<typeof createResourceSchema>;
export type UpdateResourceDto = z.infer<typeof updateResourceSchema>;
