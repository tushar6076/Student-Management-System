const { PrismaClient } = require('@prisma/client');

// Initialize Prisma Client
const prisma = new PrismaClient();

// Test connection (Optional but professional)
async function connectDB() {
  try {
    await prisma.$connect();
    console.log('✅ MongoDB Connected via Prisma');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

module.exports = { prisma, connectDB };