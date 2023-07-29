import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { LateChecckInValidationError } from "@/errors/late-checkin-in-validation-error";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate check in", async () => {
    const checkIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user_01",
    });

    const { checkIn: validatedCheckIn } = await sut.execute({
      checkInId: checkIn.id,
    });

    expect(validatedCheckIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
    expect(validatedCheckIn.validated_at).instanceOf(Date);
  });

  it("should no be able to validate the check-in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    await checkInsRepository.create({
      id: "id-01",
      gym_id: "gym-01",
      user_id: "user-01",
    });


    const twentyOneMinutesInMilleSeconds = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMilleSeconds);

    await expect(sut.execute({ checkInId: "id-01" })).rejects.toBeInstanceOf(
      LateChecckInValidationError
    );
  });
});
