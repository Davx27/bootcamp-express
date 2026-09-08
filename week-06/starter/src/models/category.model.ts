// ============================================
// MODELO: Category (sin referencias)
// Adapta el nombre, interfaz y campos a tu dominio
// ============================================
//
// Ejemplos de adaptación:
// - Biblioteca  → Author  (name, nationality, birthYear)
// - Farmacia    → Supplier (name, phone, address)
// - Gimnasio    → Plan (name, maxSessions, price)
// - Restaurante → Category (name, description)
// - Hospital    → Specialty (name, description)

import { Schema, model } from 'mongoose';

export interface ICategory {
  name: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
      maxlength: 100,
      unique: true,
    },
  },
  { timestamps: true },
);

export const Category = model<ICategory>('Category', categorySchema);