import { InMemoryUsersRepository } from "@/repositories/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/errors/invalid-credential-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("Should be able to authenticate", async () => {
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
