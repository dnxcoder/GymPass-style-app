import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  private items: CheckIn[];

  constructor() {
    this.items = [];
  }

  async create({
    gym_id,
    user_id,
    validated_at,
  }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn | null> {
    const checkIn: CheckIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: validated_at ? new Date(validated_at) : null,
      gym_id,
      user_id,
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
