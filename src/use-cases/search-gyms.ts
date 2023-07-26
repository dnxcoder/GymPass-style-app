import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface SearchGymsUseCaseRequest {
  query: string;
  page: number;
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  private gymsRepository: GymsRepository;

  constructor(gymsRepository: GymsRepository) {
    this.gymsRepository = gymsRepository;
  }

  public async execute({ query, page }: SearchGymsUseCaseRequest) {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return { gyms };
  }
}
