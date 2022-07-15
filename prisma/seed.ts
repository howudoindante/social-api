import { PrismaClient } from '@prisma/client';
const friendshipStatusesList = [
  'PENDING_FIRST_SECOND',
  'PENDING_SECOND_FIRST',
  'FRIENDS',
  'BLOCK_FIRST_SECOND',
  'BLOCK_SECOND_FIRST',
  'BLOCK_BOTH',
];
const prisma = new PrismaClient();
async function main() {
  for (const item of friendshipStatusesList) {
    const user = await prisma.friendshipStatuses.create({
      data: {
        name: item,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
