import { beforeEach, describe, expect, it } from "vitest";
import { makeGetUserProfileUseCase } from "./factories/make-get-user-profile-use-case";
import { GetUserProfileUseCase } from "./get-user-profile";
import { UsersRepository } from "@/repositories/users-repository";
import InMemoryUsersRepository from "@/repositories/in-memory-users-repository";
import { RegisterUseCase } from "./register";
import { hash } from "bcryptjs";
import { ResourceNotFound } from "@/errors/resoucer-not-found-error";

let usersRepository: UsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("Should be able to get user profile", async () => {
    const user = await usersRepository.create({
      email: "dnxcoder@gmail.com",
      password_hash: await hash("123456", 6),
      name: "Denis",
    });

    const profile = await sut.execute(user.id);

    expect(profile.user.email).toEqual(user.email);
  });

  it("Should not be able to get user profile with wrong id", async () => {
    const user = await usersRepository.create({
      email: "dnxcoder@gmail.com",
      password_hash: await hash("123456", 6),
      name: "Denis",
    });

    await expect(() => sut.execute("non-existing-id")).rejects.toBeInstanceOf(
      ResourceNotFound
    );
  });
});
