import { ResourceNotFound } from "@/errors/resoucer-not-found-error";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { CheckIn } from "@prisma/client";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  private checkInsRepository: CheckInsRepository;
  private gymsRepository: GymsRepository;

  constructor(
    checkisRepository: CheckInsRepository,
    gymsRepository: GymsRepository
  ) {
    this.checkInsRepository = checkisRepository;
    this.gymsRepository = gymsRepository;
  }

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest) {
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFound();
    }

    // calculate distance between user and gym

    if (checkInOnSameDay) {
      throw new Error("You can`t have two check ins in the same day");
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}
