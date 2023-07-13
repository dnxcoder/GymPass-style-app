import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { hash } from "bcryptjs";
import { PrismaUsersRepository } from "@/repositories/prsima-users-repository";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    return reply.status(409).send();
  }

  const prismaUsersRepository = new PrismaUsersRepository();

  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
  });

  return reply.status(201).send();
}
