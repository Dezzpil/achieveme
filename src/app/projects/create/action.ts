"use server";

import type { FormCreateProjectFieldsType } from "@/app/projects/types";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { generateKey } from "@/app/projects/utils";
import JSON5 from "json5";

export async function createProjectAction(data: FormCreateProjectFieldsType) {
  const prisma = new PrismaClient();
  const project = await prisma.project.create({
    data: {
      title: data.title,
      key: generateKey(data.title),
      css: JSON5.parse(data.css),
      schema: JSON5.parse(data.schema),
      userId: 1,
    },
  });

  redirect(`/projects/${project.id}`);
}
