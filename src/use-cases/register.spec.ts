import { expect, it, test, describe } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import InMemoryUsersRepository from "@/repositories/in-memory-users-repository";
import { UserAlreadyExistsError } from "@/errors/user-already-exists";

describe("Register Use Case", () => {
  it("it should be able to register new user", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

    const { user } = await registerUseCase.execute({
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
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);
    //creating a fake registerUseCase
    //using a fake repository

    const { user } = await registerUseCase.execute({
      email: "dnxcoder@gmail.com",
      name: "Denis",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });

  it("it should not allow register with same email twice", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

    const email = "dnxcoder@gmail.com";

    const user = await registerUseCase.execute({
      email,
      name: "Denis",
      password: "123456",
    });

    expect(() =>
      registerUseCase.execute({
        email,
        name: "Denis",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
