import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { UserAlreadyExistsError } from "@/errors/user-already-exists";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    } else {
      //if error is unknow
      throw error;
    }
  }

  return reply.status(201).send();
}
