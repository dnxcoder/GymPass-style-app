import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "./users-repository";

class InMemoryUsersRepository implements UsersRepository {
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
      id: "user-1",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}

export default InMemoryUsersRepository;
