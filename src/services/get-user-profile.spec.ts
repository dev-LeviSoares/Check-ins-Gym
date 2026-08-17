import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { GetUserProfileService } from "./get-user-profile.js";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileService

describe('Get User Profile Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileService(usersRepository);
  })

  it('should be able to get user profile', async () => {

    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })

    await expect(user.name).toEqual('John Doe');
  })

  it('should not be able to get user profile with wrong id', async () => {

    await expect(() => 
      sut.execute({
       userId: 'non-existing--id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);

  })
})