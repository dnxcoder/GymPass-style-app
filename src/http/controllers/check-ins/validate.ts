import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCheckInUseCase } from "@/use-cases/factories/make-checkin-use-case";
import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";

export async function validateCheckInController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = createCheckInParamsSchema.parse(request.params);

  try {
    const validateCheckInUseCase = makeValidateCheckInUseCase();

    await validateCheckInUseCase.execute({
      checkInId,
    });
    return reply.status(201).send();
  } catch (error) {
    throw error;
  }
}
