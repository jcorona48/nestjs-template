import { PrismaClient } from 'prisma/generated';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    create: {
      email: 'admin@example.com',
      name: 'admin',
      password:
        '$argon2id$v=19$m=4096,t=1,p=1$CXpFmapigBeSNxTo58SmEQ$rdDGBn9I+JcmPVk5rvM+a5jWi7htgPp2L1i4FotyjVs',
    },
    update: {},
    where: { email: 'admin@example.com' },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
