import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckInUseCase } from "./checkin";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsError } from "@/errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "@/errors/max-distance-error";

let checkinsRepository: CheckInsRepository;
let gymsRepository: GymsRepository;
let sut: CheckInUseCase;

describe("Create Checkin Use Case", () => {
  beforeEach(async () => {
    checkinsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkinsRepository, gymsRepository);

    vi.useFakeTimers();

    await gymsRepository.create({
      id: "gym-01",
      title: "Gym da rapaziada",
      description: "Rapazes",
      phone: "231224",
      latitude: 38.6579838,
      longitude: -90.3319484,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should be able to create a check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 38.6579838,
      userLongitude: -90.3319484,
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
      userLatitude: 38.6579838,
      userLongitude: -90.3319484,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: 38.6579838,
        userLongitude: -90.3319484,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to checkin in different days", async () => {
    //mocking a date for avoiding erros on tests
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 38.6579838,
      userLongitude: -90.3319484,
    });

    //changing day
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 38.6579838,
      userLongitude: -90.3319484,
    });

    expect(checkIn?.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    await gymsRepository.create({
      id: "gym-02",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(38.6579838),
      longitude: new Decimal(-90.3319484),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: 38.6588484,
        userLongitude: -90.3209908,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
