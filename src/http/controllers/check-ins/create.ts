import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCheckInUseCase } from "@/use-cases/factories/make-checkin-use-case";

export async function createCheckInController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { gymId } = createCheckInParamsSchema.parse(request.params);

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

  try {
    const checkInUseCase = makeCheckInUseCase();

    await checkInUseCase.execute({
      gymId,
      userId: request.user.sub,
      userLatitude: latitude,
      userLongitude: longitude,
    });
  } catch (error) {
    throw error;
  }

  return reply.status(201).send();
}
