import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

export async function searchGymController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchGymsQuerySchema.parse(request.params);

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
