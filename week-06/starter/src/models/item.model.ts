// ============================================
// MODELO: Item (con referencia a Category)
// Adapta el nombre, interfaz y campos a tu dominio
// ============================================
//
// Ejemplos de adaptación:
// - Biblioteca  → Book  (title, isbn, author: ObjectId)
// - Farmacia    → Medicine (name, code, supplier: ObjectId)
// - Gimnasio    → Member (name, email, plan: ObjectId)
// - Restaurante → Dish (name, price, category: ObjectId)
// - Hospital    → Patient (name, dni, doctor: ObjectId)

import { Schema, model, Types } from 'mongoose';

export interface IItem {
  sku: string;
  name: string;
  brand: string;
  price: number;
  salesCount: number;
  rentalsCount: number;
  category: Types.ObjectId;
}

const itemSchema = new Schema<IItem>(
  {
    sku: {
      type: String,
      required: [true, 'El SKU es requerido'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
      maxlength: 150,
    },
    brand: {
      type: String,
      required: [true, 'La marca es requerida'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'El precio es requerido'],
      min: [0, 'El precio no puede ser negativo'],
    },
    salesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    rentalsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'La categoría es requerida'],
    },
  },
  { timestamps: true },
);

export const Item = model<IItem>('Item', itemSchema);