import { expect, it, test, describe } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";

test("check if it works", () => {
  expect(2 + 2).toBe(4);
});

describe("Register Use Case", () => {
  it("should hash user password up registraton", async () => {
    //creating a fake registerUseCase
    //using a fake repository
    const registerUseCase = new RegisterUseCase({
      async create(data) {
        return {
          id: "user-1",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
      async findByEmail(email) {
        return null;
      },
    });

    const createdUser = await registerUseCase.execute({
      email: "dnxcoder@gmail.com",
      name: "Denis",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", createdUser.password_hash);

    expect(isPasswordHashed).toBe(true);
  });
});
