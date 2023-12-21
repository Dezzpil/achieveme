"use server";

import { FormCreateProjectFieldsType } from "@/app/projects/types";
import { PrismaClient } from "@prisma/client";
import { generateKey, validateSchema } from "@/app/projects/utils";
import { revalidatePath } from "next/cache";
import JSON5 from "json5";

export async function modifyProjectAction(
  id: number,
  d: FormCreateProjectFieldsType,
) {
  validateSchema(d.schema);

  const prisma = new PrismaClient();
  await prisma.project.update({
    where: { id },
    data: {
      title: d.title,
      key: generateKey(d.title),
      css: JSON5.parse(d.css),
      schema: JSON5.parse(d.schema),
    },
  });

  revalidatePath(`/projects/${id}`);
}
