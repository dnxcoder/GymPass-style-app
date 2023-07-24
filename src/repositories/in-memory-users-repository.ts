import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "./users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[];

  constructor() {
    this.items = [];
  }

  async findByEmail(email: string): Promise<User | null> {
    let foundUser = this.items.find((user) => {
      return user.email === email;
    });

    if (!foundUser) return null;

    return foundUser;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === userId);

    if (!user) return null;

    return user;
  }
}
