import { FastifyRequest, FastifyReply } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  //verifies if token is valid
  await request.jwtVerify();

  console.log(request.user.sub);

  return reply.status(200).send();
}
