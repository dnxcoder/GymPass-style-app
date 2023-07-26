import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: CheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it("Should be able to get check-ins count from metrics", async () => {
    for (let index = 0; index < 22; index++) {
      await checkInsRepository.create({
        gym_id: `gym-${index}`,
        user_id: "user-01",
      });
    }

    const { checkInsCount } = await sut.execute({ userId: "user-01" });

    expect(checkInsCount).toBe(22);
  });
});
