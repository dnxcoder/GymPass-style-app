import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createCheckInController } from "./create";
import { validateCheckInController } from "./validate";
import { checkInsHistoryController } from "./history";
import { checkInsMetricsController } from "./metrics";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/check-ins/history", checkInsHistoryController);
  app.get("check-ins/metrics", checkInsMetricsController);

  app.post("/gyms/:gymId/check-ins", createCheckInController);
  app.patch("/check-ins/:checkInId/validate", validateCheckInController);
}
