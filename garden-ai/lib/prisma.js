// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

console.log("--- Prisma Client Initializing ---");
const prisma = new PrismaClient();
console.log("--- Prisma Client Initialized ---");

export default prisma;