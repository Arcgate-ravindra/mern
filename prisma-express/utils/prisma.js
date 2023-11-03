const { PrismaClient } = require('@prisma/client');


const prismaConnection = () => {
    const prisma = new PrismaClient();
    return prisma;
}

module.exports = prismaConnection;