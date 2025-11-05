// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-file
import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';

const adapter = new PrismaLibSQL({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.upsert({
    create: {
      email: 'admin@example.com',
      name: 'admin',
      password:
        '$argon2id$v=19$m=4096,t=1,p=1$CXpFmapigBeSNxTo58SmEQ$rdDGBn9I+JcmPVk5rvM+a5jWi7htgPp2L1i4FotyjVs', // sensitive
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
