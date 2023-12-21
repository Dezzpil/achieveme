import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.headers["Project-ID"];
  const key = req.headers["Project-Key"];

  if (id && key) {
    const prisma = new PrismaClient();
    const project = await prisma.project.findUnique({
      where: {
        id: parseInt(id as string),
        key: key as string,
      },
    });
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({});
    }
  } else {
    res.status(403).json({});
  }
}
