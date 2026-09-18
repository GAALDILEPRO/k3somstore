// Prisma Client Singleton for K3SOMSTORE PostgreSQL Database
// Safely initializes connection when DATABASE_URL is active

let prismaClientInstance: unknown = null;

try {
  // Dynamically require to allow zero-error compilation before PostgreSQL database migration
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require('@prisma/client');
  const globalForPrisma = globalThis as unknown as { prisma?: unknown };

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
  }
  prismaClientInstance = globalForPrisma.prisma;
} catch {
  // Graceful fallback during development seed / pre-generate phase
  prismaClientInstance = null;
}

export const prisma = prismaClientInstance;
