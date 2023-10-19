import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({ data: { email: 'me@e.mail' } });
  console.log(user);
  const projects = await prisma.project.createMany({ data: [
    { key: String(Date.now() - 10), title: 'Project 1', userId: user.id, css: '' },
    { key: String(Date.now() + 10), title: 'Project 2', userId: user.id, css: '' },
  ]});
  console.log(projects);
}

main().catch((e) => {
  console.error(e);
}).finally(() => {
  prisma.$disconnect()
})