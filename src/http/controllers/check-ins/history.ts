import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";

export async function checkInsHistoryController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.params);

  try {
    const fetchUserCheckInHistoryUseCase =
      makeFetchUserCheckInsHistoryUseCase();

    const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({
      userId: request.user.sub,
      page,
    });
    return reply.status(201).send(checkIns);
  } catch (error) {
    throw error;
  }
}
