// ============================================
// SEED — Insertar datos de prueba
// Seed del catálogo de instrumentos y categorías
// ============================================
//
// Las categorías deben insertarse primero para poder referenciarlas desde los items.
//
// Ejemplo para Biblioteca:
//   Paso A: Insertar Authors → obtener _id
//   Paso B: Insertar Books con author: author._id

import 'dotenv/config';
import { connectDB, disconnectDB } from './lib/mongoose';
import { Category } from './models/category.model';
import { Item } from './models/item.model';

async function seed(): Promise<void> {
  await connectDB();

  // 1. Limpiar colecciones en orden inverso a la referencia
  await Item.deleteMany({});
  await Category.deleteMany({});
  console.log('Collections cleared');

  // 2. Insertar categorías y capturar sus _id
  const [cuerdas, percusion, teclados, viento] = await Category.insertMany([
    { name: 'Cuerdas' },
    { name: 'Percusión' },
    { name: 'Teclados' },
    { name: 'Viento' },
  ]);
  console.log('Categories inserted');

  // 3. Insertar instrumentos referenciando los _id de las categorías
  await Item.insertMany([
    {
      sku: 'GTR-STRAT-001',
      name: 'Guitarra Eléctrica Stratocaster',
      brand: 'Fender',
      price: 1200,
      salesCount: 15,
      rentalsCount: 4,
      category: cuerdas._id,
    },
    {
      sku: 'GTR-LES-002',
      name: 'Guitarra Eléctrica Les Paul Standard',
      brand: 'Gibson',
      price: 2500,
      salesCount: 8,
      rentalsCount: 2,
      category: cuerdas._id,
    },
    {
      sku: 'DRM-STAGE-001',
      name: 'Batería Acústica Stage Custom',
      brand: 'Yamaha',
      price: 900,
      salesCount: 5,
      rentalsCount: 10,
      category: percusion._id,
    },
    {
      sku: 'KEY-P45-001',
      name: 'Piano Digital P-45',
      brand: 'Yamaha',
      price: 500,
      salesCount: 20,
      rentalsCount: 1,
      category: teclados._id,
    },
    {
      sku: 'WND-YAS280-001',
      name: 'Saxofón Alto YAS-280',
      brand: 'Yamaha',
      price: 1100,
      salesCount: 3,
      rentalsCount: 6,
      category: viento._id,
    },
  ]);
  console.log('Items inserted');

  console.log('Seed completed successfully');
  await disconnectDB();
}

seed().catch((err: unknown) => {
  console.error('Seed failed:', err);
  process.exit(1);
});