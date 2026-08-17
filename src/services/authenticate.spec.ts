import { expect, describe, it, beforeEach } from "vitest";
import { AuthenticateService } from "./authenticate.js";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository.js";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.js";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateService

describe('Authenticate Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateService(usersRepository);
  })

  it('should be able to autheticate', async () => {

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect(user.id).toEqual(expect.any(String));
  })

  it('should not be able to authenticate with wrong email', async () => {

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    await expect(() => 
      sut.execute({
        email: 'johnd@example.com',
        password: '1234'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);

  })

  it('should not be able to authenticate with wrong password', async () => {

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    await expect(() => 
      sut.execute({
        email: 'johnd@example.com',
        password: '1234'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);

  })
})