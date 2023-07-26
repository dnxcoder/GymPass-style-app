import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import { GetResult } from "@prisma/client/runtime/library";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  private items: CheckIn[];

  constructor() {
    this.items = [];
  }

  public async create({
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

  public async findManyByUserId(
    userId: string,
    page: number
  ): Promise<CheckIn[]> {
    const checkIns = this.items
      .filter((checkIn) => {
        return checkIn.user_id === userId;
      })
      .slice((page - 1) * 20, page * 20);

    return checkIns;
  }

  public async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnSameDate = this.items.find((checkIn) => {
      const chekInDate = dayjs(checkIn.created_at);

      const isOnSameDate =
        chekInDate.isAfter(startOfTheDay) && chekInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    return checkInOnSameDate ? checkInOnSameDate : null;
  }
}
