import { GymsRepository } from "@/repositories/gyms-repository";
import { CreateGymUseCase } from "./create-gym";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: GymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should create a gym", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript Gym",
      description: "Gym for Developers",
      phone: "131245125",
      latitude: 38.32848,
      longitude: 88.9088469,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
