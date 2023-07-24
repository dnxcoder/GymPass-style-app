import { expect, it, test, describe, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory-users-repository";
import { UserAlreadyExistsError } from "@/errors/user-already-exists";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("it should be able to register new user", async () => {
    const { user } = await sut.execute({
      email: "ichigo@gmail.com",
      name: "ichigo",
      password: "123123",
    });

    console.log(user.id, "my test");

    // I hope to get any id to be any string
    // if the id is any string it means
    // that the user was created
    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password up registraton", async () => {
    const { user } = await sut.execute({
      email: "dnxcoder@gmail.com",
      name: "Denis",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });

  it("it should not allow register with same email twice", async () => {
    //Creating a new user
    await sut.execute({
      email: "dnxcoder@gmail.com",
      name: "Denis",
      password: "123456",
    });

    //Creating another user with same email to test error
    await expect(() =>
      sut.execute({
        email: "dnxcoder@gmail.com",
        name: "Denis",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
