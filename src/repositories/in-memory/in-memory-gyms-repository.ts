import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryGymsRepository implements GymsRepository {
  private items: Gym[];

  constructor() {
    this.items = [];
  }

  async findById(id: string): Promise<Prisma.GymCreateInput | null> {
    const foundGym = this.items.find((item) => item.id === id);

    return foundGym ? foundGym : null;
  }

  async create(data: Prisma.GymCreateInput): Promise<Prisma.GymCreateInput> {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      phone: data.phone ?? null,
      description: data.description ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    };

    this.items.push(gym);

    return gym;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }
}
