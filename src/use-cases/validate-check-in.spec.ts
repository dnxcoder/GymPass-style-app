import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);
  });

  it("should be able to validate check in",async () => {
   const checkIn = await  checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user_01",
    });

    const {checkIn:validatedCheckIn} =await sut.execute({checkInId:checkIn.id});

    expect(validatedCheckIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
    expect(validatedCheckIn.validated_at).instanceOf(Date);

  });
});
