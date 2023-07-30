import { FastifyInstance } from "fastify";
import { registerController } from "./controllers/register";
import { authenticateController } from "./controllers/authenticate";
import { profile } from "./controllers/profile";
import { verifyJWT } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", registerController);

  app.post("/sessions", authenticateController);

  /* Authenticated Routes */

  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
