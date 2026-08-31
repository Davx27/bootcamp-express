// src/lib/prisma.ts — Singleton de PrismaClient
// ============================================================
// TODO: Implementar el singleton de PrismaClient
//
// Lineamientos:
//   - Usar el patrón globalForPrisma para evitar múltiples instancias
//   - Añadir log: ['query', 'warn', 'error'] en desarrollo
//   - Exportar `prisma` como named export
// =====================================================

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env['NODE_ENV'] === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env['NODE_ENV'] !== 'production') {
  globalForPrisma.prisma = prisma;
}