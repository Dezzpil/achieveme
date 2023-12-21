import { z } from "zod";

export const FormCreateProjectFieldsSchema = z.object({
  title: z.string().min(3).max(255),
  schema: z
    .string()
    .min(2, "Any JSON schema definition, {} is valid, for example"),
  css: z.string().min(2, "Any CSS description, {} is valid, for example"),
});

export type FormCreateProjectFieldsType = z.infer<
  typeof FormCreateProjectFieldsSchema
>;
