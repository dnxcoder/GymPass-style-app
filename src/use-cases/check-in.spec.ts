import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckInUseCase } from "./checkin";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { randomUUID } from "node:crypto";

let checkinsRepository: CheckInsRepository;
let sut: CheckInUseCase;

describe("Create Checkin Use Case", () => {
  beforeEach(() => {
    checkinsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkinsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should be able to create a check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: randomUUID(),
      userId: randomUUID(),
    });

    if (checkIn) {
      console.log(checkIn?.created_at);
      expect(checkIn.id).toEqual(expect.any(String));
    }
  });

  it("Should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
