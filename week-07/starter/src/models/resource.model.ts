import mongoose, { Document, Schema } from 'mongoose';

// ============================================
// MODELO DEL RECURSO PRINCIPAL
// ============================================
// INSTRUCCIONES:
//
// 1. Cambia el nombre de este archivo al recurso real de tu dominio.
//    Ejemplos: book.model.ts, medication.model.ts, member.model.ts
//
// 2. Reemplaza la interfaz IResource con los campos de tu recurso.
//    Elimina los campos de ejemplo y agrega los propios.
//
// 3. Renombra el model al final: mongoose.model<IBook>('Book', bookSchema)
//
// 4. Actualiza las importaciones en repository, service, controller y routes.
// ============================================

// TODO: Reemplaza IResource con la interfaz real de tu recurso
// Ejemplo para Biblioteca:
//   export interface IBook extends Document {
//     title: string;
//     author: string;
//     isbn: string;
//     available: boolean;
//     createdBy: mongoose.Types.ObjectId;
//   }
export interface IInstrument extends Document {
  name: string;
  brand: string;
  category: 'strings' | 'keyboards' | 'drums' | 'wind' | 'audio' | 'accessories';
  description?: string;
  price: number;
  stock: number;
  condition: 'new' | 'used';
  availableForSale: boolean;
  availableForRental: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const instrumentSchema = new Schema<IInstrument>(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    category: { type: String, enum: ['strings', 'keyboards', 'drums', 'wind', 'audio', 'accessories'], required: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, validate: Number.isInteger },
    condition: { type: String, enum: ['new', 'used'], default: 'new' },
    availableForSale: { type: Boolean, default: true },
    availableForRental: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// TODO: Renombra 'Resource' por el nombre real de tu modelo (singular, PascalCase)
// Ejemplo: mongoose.model<IBook>('Book', bookSchema)
export const InstrumentModel = mongoose.model<IInstrument>('Instrument', instrumentSchema);
