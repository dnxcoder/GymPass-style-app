import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";

export async function nearbyGymController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const nearbyGymQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymQuerySchema.parse(request.params);

  try {
    const createGymUseCase = makeFetchNearbyGymsUseCase();

    await createGymUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
    });
  } catch (error) {
    throw error;
  }

  return reply.status(201).send();
}
