"use server";

import type { FormCreateProjectFieldsType } from "@/app/projects/types";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { generateKey, getAuthedUser } from "@/app/projects/utils";
import JSON5 from "json5";

export async function createProjectAction(data: FormCreateProjectFieldsType) {
  const user = await getAuthedUser();

  const prisma = new PrismaClient();
  const project = await prisma.project.create({
    data: {
      title: data.title,
      key: generateKey(data.title),
      css: JSON5.parse(data.css),
      schema: JSON5.parse(data.schema),
      userId: user.id,
    },
  });

  redirect(`/projects/${project.id}`);
}
