import { MaxDistanceError } from "@/errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "@/errors/max-number-of-check-ins-error";
import { ResourceNotFound } from "@/errors/resoucer-not-found-error";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
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

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: Number(gym.latitude), longitude: Number(gym.longitude) }
    );

    //if distance greater than 100 meters throw error

    const MAX_DISTANCE_IN_KM = 0.1;

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError();
    }

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError();
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}
