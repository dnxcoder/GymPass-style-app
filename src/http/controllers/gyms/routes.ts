import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { createGymController } from "./create";

export async function gymsRoutes(app: FastifyInstance) {
  //every route below this line will verifyJWT
  app.addHook("onRequest", verifyJWT);

  app.post("/gym", createGymController);
}
