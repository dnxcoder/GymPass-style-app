import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckInUseCase } from "./checkin";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckIn } from "@prisma/client";
import { randomUUID } from "node:crypto";

let checkinsRepository: CheckInsRepository;
let sut: CheckInUseCase;

describe("Create Checkin Use Case", () => {
  beforeEach(() => {
    checkinsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkinsRepository);
  });

  it("Should be able to create a check in", async () => {
    const checkin = await sut.execute({
      gymId: randomUUID(),
      userId: randomUUID(),
    });

    if (checkin) {
      expect(checkin.id).toEqual(expect.any(String));
    }
  });
});
