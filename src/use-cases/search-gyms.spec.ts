import { GymsRepository } from "@/repositories/gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: GymsRepository;
let sut: SearchGymsUseCase;

describe("should be able to search for gyms", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("Should be able to search gyms", async () => {
    await gymsRepository.create({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -27.2092052,
    });

    await gymsRepository.create({
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -27.2092052,
    });

    const { gyms } = await sut.execute({
      query: "JavaScript Gym",
      page: 1,
    });

    expect(gyms).toHaveLength(1);

    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
    ]);
  });

  it("should be able to fetch paginated search gyms", async () => {
    for (let index = 0; index < 22; index++) {
      await gymsRepository.create({
        title: `TypeScript Gym-${index + 1}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -27.2092052,
      });
    }

    const { gyms } = await sut.execute({
      query: "TypeScript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: `TypeScript Gym-21` }),
      expect.objectContaining({ title: `TypeScript Gym-22` }),
    ]);
  });
});
