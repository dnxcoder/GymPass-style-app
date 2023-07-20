import InMemoryUsersRepository from "@/repositories/in-memory-users-repository";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/errors/invalid-credential-error";

describe("Authenticate Use Case", () => {
  it("Should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      email: "dnxcoder@gmail.com",
      name: "Denis",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "dnxcoder@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      email: "dnxcoder@gmail.com",
      name: "Denis",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "dnxcoderrr@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      email: "dnxcoder@gmail.com",
      name: "Denis",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "dnxcoder@gmail.com",
        password: "123456222",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
