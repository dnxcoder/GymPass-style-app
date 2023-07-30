import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send({ message: "Unauthorazed" });
  }
  //verifies if token is valid

  //const userId = request.user.sub;

  //const gerUserProfile = makeGetUserProfileUseCase();
}
