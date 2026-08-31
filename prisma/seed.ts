// prisma/seed.ts — Datos iniciales del dominio
// Ejecutar con: pnpm dlx prisma db seed

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Iniciando seed...');

  // 1. Limpieza de datos previa para garantizar idempotencia
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();

  console.log('🧹 Base de datos limpiada');

  // 2. Creación del recurso secundario (Categorías)
  const stringCategory = await prisma.category.create({
    data: { name: 'Cuerdas' },
  });

  const percussionCategory = await prisma.category.create({
    data: { name: 'Percusión' },
  });

  const keysCategory = await prisma.category.create({
    data: { name: 'Teclados' },
  });

  console.log('✅ Categorías creadas');

  // 3. Creación del recurso principal (mínimo 5 registros)
  const itemsData = [
    {
      sku: 'GTR-STRAT-001',
      name: 'Guitarra Eléctrica Stratocaster',
      brand: 'Fender',
      price: 1200.0,
      salesCount: 15,
      rentalsCount: 4,
      categoryId: stringCategory.id,
    },
    {
      sku: 'GTR-LESPAUL-002',
      name: 'Guitarra Eléctrica Les Paul Standard',
      brand: 'Gibson',
      price: 2500.0,
      salesCount: 8,
      rentalsCount: 2,
      categoryId: stringCategory.id,
    },
    {
      sku: 'BAT-STAGE-001',
      name: 'Batería Acústica Stage Custom',
      brand: 'Yamaha',
      price: 950.0,
      salesCount: 6,
      rentalsCount: 10,
      categoryId: percussionCategory.id,
    },
    {
      sku: 'KEY-MINI-001',
      name: 'Teclado Sintetizador Minilogue',
      brand: 'Korg',
      price: 650.0,
      salesCount: 20,
      rentalsCount: 5,
      categoryId: keysCategory.id,
    },
    {
      sku: 'KEY-P45-002',
      name: 'Piano Digital P-45',
      brand: 'Yamaha',
      price: 500.0,
      salesCount: 12,
      rentalsCount: 8,
      categoryId: keysCategory.id,
    },
  ];

  const result = await prisma.item.createMany({
    data: itemsData,
  });

  console.log(`✅ ${result.count} instrumentos creados correctamente`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error en seed:', e);
    await prisma.$disconnect();
    throw e;
  });