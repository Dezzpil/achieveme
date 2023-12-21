import { createHash } from "crypto";
import Ajv, { ValidateFunction } from "ajv";
import JSON5 from "json5";

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
