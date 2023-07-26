import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInsHistoryRequestUseCase {
  userId: string;
  page: number;
}

interface FetchUserCheckInsHistoryResponseUseCase {
  checkIns: CheckIn[];
}

export class FetchUserChekInsHistoryUseCase {
  private checkInsRepository: CheckInsRepository;

  constructor(checkInsRepository: CheckInsRepository) {
    this.checkInsRepository = checkInsRepository;
  }

  async execute({ userId, page }: FetchUserCheckInsHistoryRequestUseCase) {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );

    return {
      checkIns,
    };
  }
}
