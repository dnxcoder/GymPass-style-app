import "dotenv/config";
import { z } from "zod";

//validate envirtoment variables

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
});

//it tries to verify what variables you have in process.env
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid enviroment variables", _env.error.format());

  throw new Error("Invalid enviroment variable.");
}

export const env = _env.data;
