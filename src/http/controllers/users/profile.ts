import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { FastifyRequest, FastifyReply } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub;

  const gerUserProfile = makeGetUserProfileUseCase();

  const user = await gerUserProfile.execute(userId);

  return reply.status(200).send({ ...user, password_hash: undefined });
}
