import { Gym } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  private items: Gym[];

  constructor() {
    this.items = [];
  }

  async findById(id: string): Promise<Gym | null> {
    const foundGym = this.items.find((item) => item.id === id);

    return foundGym ? foundGym : null;
  }

  async create(data: Gym): Promise<Gym | null> {
    this.items.push({
      id: data.id,
      title: data.title,
      phone: data.phone,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude,
    });

    return null;
  }
}
