import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";

export async function checkInsMetricsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getUserMetricsUseCase = makeGetUserMetricsUseCase();

    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: request.user.sub,
    });
    return reply.status(201).send(checkInsCount);
  } catch (error) {
    throw error;
  }
}
