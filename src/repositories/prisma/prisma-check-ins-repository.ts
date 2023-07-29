import { GetResult } from "@prisma/client/runtime/library";
import { CheckInsRepository } from "../check-ins-repository";
import { CheckIn, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepository {
  public async findById(id: string): Promise<CheckIn | null> {
    const foundCheckIn = await prisma.checkIn.findUnique({
      where: {
        id: id,
      },
    });
    if (!foundCheckIn) return null;

    return foundCheckIn;
  }

  public async countByUserId(userId: string): Promise<number> {
    const checkIns = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return checkIns;
  }

  public async create(
    data: Prisma.CheckInUncheckedCreateInput
  ): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  public async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data: data,
    });

    return checkIn;
  }

  public async findManyByUserId(
    userId: string,
    page: number
  ): Promise<CheckIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }

  public async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const foundCheckInOnSameDate = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        //this querry allows to look up for checkins that happened
        //between the begining of the day and the end of the day
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return foundCheckInOnSameDate ?? null;
  }
}
