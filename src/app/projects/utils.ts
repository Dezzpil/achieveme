import { createHash } from "crypto";
import Ajv, { ValidateFunction } from "ajv";
import JSON5 from "json5";
import { getServerSession } from "next-auth";
import { PrismaClient, User } from "@prisma/client";

export function generateKey(data: string): string {
  const salt = "hello, world!";
  return createHash("sha256")
    .update(salt + data)
    .digest("base64");
}

export function validateSchema(schema: string): ValidateFunction {
  const ajv = new Ajv();
  const json = JSON5.parse(schema);
  return ajv.compile(json);
}

export async function getAuthedUser(): Promise<User | never> {
  const session = await getServerSession();
  if (!session || !session.user) {
    throw new Error("no auth");
  }
  if (!session.user.email) {
    throw new Error("no email info in auth data");
  }
  const email = session.user.email;
  const prisma = new PrismaClient();
  let user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    user = await prisma.user.create({ data: { email } });
  }
  return user;
}
