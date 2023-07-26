import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { FetchUserChekInsHistoryUseCase } from "./fetch-user-check-ins-history";
import { afterEach, describe, expect, it, vi, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInsRepository: CheckInsRepository;
let gymsRepository: GymsRepository;
let sut: FetchUserChekInsHistoryUseCase;

describe("Fetch User Check In History Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchUserChekInsHistoryUseCase(checkInsRepository);

    vi.useFakeTimers();

    await gymsRepository.create({
      id: "gym-01",
      title: "Gym da rapaziada",
      description: "Rapazes",
      phone: "231224",
      latitude: new Decimal(38.6579838),
      longitude: new Decimal(-90.3319484),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should list history of check Ins", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkIns } = await sut.execute({ userId: "user-01", page: 1 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });

  it("should be able to fetch paginated check-in history", async () => {
    for (let index = 0; index < 22; index++) {
      await checkInsRepository.create({
        gym_id: `gym-${index + 1}`,
        user_id: "user-01",
      });
    }

    const { checkIns } = await sut.execute({ userId: "user-01", page: 2 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
