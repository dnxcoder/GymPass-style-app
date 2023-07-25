import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

interface CreateGymRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  private gymRepository: GymsRepository;

  constructor(gymRepository: GymsRepository) {
    this.gymRepository = gymRepository;
  }

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymRequest) {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude: new Decimal(latitude),
      longitude: new Decimal(longitude),
    });

    return { gym };
  }
}
