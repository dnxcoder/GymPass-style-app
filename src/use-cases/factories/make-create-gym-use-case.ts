import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymUseCase } from "../create-gym";

export function MakeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const createGymsUseCase = new CreateGymUseCase(gymsRepository);

  return createGymsUseCase;
}
