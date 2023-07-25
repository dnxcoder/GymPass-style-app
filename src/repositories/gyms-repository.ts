import { Gym, Prisma } from "@prisma/client";

export interface GymsRepository {
  findById(id: string): Promise<Prisma.GymCreateInput | null>;
  create(data: Prisma.GymCreateInput): Promise<Prisma.GymCreateInput>;
}
