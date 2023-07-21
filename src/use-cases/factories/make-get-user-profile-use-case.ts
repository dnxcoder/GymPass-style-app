import { GetUserProfileUseCase } from "../get-user-profile";
import { PrismaUsersRepository } from "@/repositories/prisma/prsima-users-repository";

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);

  return getUserProfileUseCase;
}
