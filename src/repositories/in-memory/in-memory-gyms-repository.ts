import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";
import { randomUUID } from "crypto";

export class InMemoryGymsRepository implements GymsRepository {
  private items: Prisma.GymCreateInput[];

  constructor() {
    this.items = [];
  }

  async findById(id: string): Promise<Prisma.GymCreateInput | null> {
    const foundGym = this.items.find((item) => item.id === id);

    return foundGym ? foundGym : null;
  }

  async create(data: Prisma.GymCreateInput): Promise<Prisma.GymCreateInput> {
    const gym = {
      id: data.id ? data.id : randomUUID(),
      title: data.title,
      phone: data.phone,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude,
    };

    this.items.push(gym);

    return gym;
  }
}
