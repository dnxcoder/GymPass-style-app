import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  private checkInsRepository: CheckInsRepository;

  constructor(checkisRepository: CheckInsRepository) {
    this.checkInsRepository = checkisRepository;
  }

  async execute({ gymId, userId }: CheckInUseCaseRequest) {
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return checkIn;
  }
}
