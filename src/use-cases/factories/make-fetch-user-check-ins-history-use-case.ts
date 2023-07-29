import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { FetchUserChekInsHistoryUseCase } from "../fetch-user-check-ins-history";

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInRepository = new PrismaCheckInsRepository();
  const fetchUserCheckInHistoryUseCase = new FetchUserChekInsHistoryUseCase(
    checkInRepository
  );

  return fetchUserCheckInHistoryUseCase;
}
