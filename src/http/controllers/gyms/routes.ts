import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { createGymController } from "./create";
import { searchGymController } from "./search";
import { nearbyGymController } from "./nearby";

export async function gymsRoutes(app: FastifyInstance) {
  //every route below this line will verifyJWT
  app.addHook("onRequest", verifyJWT);

  app.post("/gyms", createGymController);
  app.get("/gyms/search", searchGymController);
  app.get("/gyms/nearby", nearbyGymController);
}
