import { ResourceNotFound } from "@/errors/resoucer-not-found-error";
import { UsersRepository } from "@/repositories/users-repository";

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {}

export class GetUserProfileUseCase {
  private userRepository: UsersRepository;

  constructor(userRepository: UsersRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFound();
    }

    return { user };
  }
}
