import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { MakeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";

export async function createGymController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body);

  try {
    const createGymUseCase = MakeCreateGymUseCase();

    await createGymUseCase.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
    });
  } catch (error) {
    throw error;
  }

  return reply.status(201).send();
}
