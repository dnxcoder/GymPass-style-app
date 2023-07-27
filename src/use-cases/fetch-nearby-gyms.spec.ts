import { GymsRepository } from "@/repositories/gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let gymsRepository: GymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "Near Gym",
      description: "Rapazes",
      phone: "231224",
      latitude: new Decimal(38.6579832),
      longitude: new Decimal(-90.2319481),
    });

    await gymsRepository.create({
      id: "gym-02",
      title: "Far Gym",
      description: "Rapazes",
      phone: "231224",
      latitude: new Decimal(39.6579838),
      longitude: new Decimal(-90.2319489),
    });
  });

  it("should fetch gyms nearby", async () => {
    const { gyms } = await sut.execute({
      userLatitude: 38.6579838,
      userLongitude: -90.2319484,
    });

    console.log(gyms, "<=========");

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
