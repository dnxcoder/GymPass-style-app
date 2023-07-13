import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user ? user : null;
  }

  async create(data: Prisma.UserCreateInput) {
    const { name, email, password_hash } = data;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    });

    return user;
  }
}
