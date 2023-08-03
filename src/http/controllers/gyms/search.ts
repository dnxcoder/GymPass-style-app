import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

export async function searchGymController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchGymsBodySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchGymsBodySchema.parse(request.body);

  try {
    const searchGymUseCase = makeSearchGymsUseCase();

    await searchGymUseCase.execute({
      query: query,
      page: page,
    });
  } catch (error) {
    throw error;
  }

  return reply.status(201).send();
}
