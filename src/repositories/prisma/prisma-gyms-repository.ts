import { CheckIn, Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { prisma } from "@/lib/prisma";
import { GetResult } from "@prisma/client/runtime/library";

export class PrismaGymsRepository implements GymsRepository {
  public async findById(id: string): Promise<Prisma.GymCreateInput | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id: id,
      },
    });

    return gym ?? null;
  }

  public async create(
    data: Prisma.GymCreateInput
  ): Promise<Prisma.GymCreateInput> {
    const gym = await prisma.gym.create({
      data: {
        ...data,
      },
    });

    return gym ?? null;
  }

  public async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
     SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10`;

    return gyms;
  }

  public async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }
}
