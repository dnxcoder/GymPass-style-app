import { LateChecckInValidationError } from "@/errors/late-checkin-in-validation-error";
import { ResourceNotFound } from "@/errors/resoucer-not-found-error";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { getDifferenceInMinutes } from "@/utils/get-diference-in-minutes";
import { CheckIn } from "@prisma/client";
import dayjs from "dayjs";

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  private checkInsRepository: CheckInsRepository;

  constructor(checkInsRepository: CheckInsRepository) {
    this.checkInsRepository = checkInsRepository;
  }

  public async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) throw new ResourceNotFound();

    const differenceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minute"
    );

    if (differenceInMinutesFromCheckInCreation > 20) {
      throw new LateChecckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
