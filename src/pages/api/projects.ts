import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "@prisma/client";

import { z } from 'zod';
import { PrismaClient } from "@prisma/client";

export const ProjectCreateSchema = z.object({
  title: z.string().min(1, 'too short').max(48, 'too long'),
  css: z.string().max(1024, 'too long')
})
export type ProjectCreateType = z.infer<typeof ProjectCreateSchema>;

const hash = (val: string): string => {
  return val;
}

const getCurrentUser = async (prisma: PrismaClient): Promise<User> => {
  const user = await prisma.user.findFirst();
  if (!user) throw new Error('not authed');
  return user;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const body = ProjectCreateSchema.parse(req.body) as ProjectCreateType;

  const prisma = new PrismaClient();
  const user = await getCurrentUser(prisma);

  const project = await prisma.project.create({
    data: {
      title: body.title,
      css: body.css,
      key: hash(body.title),
      userId: user.id
    }
  });

  res.status(200).json(project)
}

export default handler;