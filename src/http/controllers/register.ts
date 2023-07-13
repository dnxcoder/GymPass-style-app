import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prsima-users-repository";

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
    //await RegisterUseCase({ name, email, password });

    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({ name, email, password });
  } catch (error) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
