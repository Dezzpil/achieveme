
import ajv from 'ajv';
import {NextApiRequest, NextApiResponse} from "next";

import { z } from 'zod';

export const PropsSchema = z.object({
  definition: z.string().min(2).regex(/\{.*\}/gsu),
  data: z.string().min(2).regex(/\{.*\}/gsu)
})

type PropsType = z.infer<typeof PropsSchema>

const Ajv = new ajv();

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const body = PropsSchema.parse(req.body) as PropsType
  const def = JSON.parse(body.definition);
  const data = JSON.parse(body.data)
  const validate = Ajv.compile(def);

  if (validate(data)) {
    res.status(200).json({ valid: true })
  } else {
    res.status(400).json({ valid: false });
  }
}

export default handler;