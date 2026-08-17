import { expect, describe, it, beforeEach } from "vitest";
import { RegisterService } from "./register.js";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository.js";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterService;

describe('Register Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterService(usersRepository);
  })

  it('should be able to register', async () => {
    
    const { user } = await sut.execute({
      name: 'LS Soares',
      email: 'lssoares@getMaxListeners.com',
      password: '12345678'
    })

    await expect(user.id).toEqual(expect.any(String));

  })
  it('should hash user password upon registration', async () => {

    const { user } = await sut.execute({
      name: 'LS Soares',
      email: 'lssoares@getMaxListeners.com',
      password: '12345678'
    })

    const isPasswordCorrectlyHashed = await compare(
      '12345678',
      user.password_hash
    )

    await expect(isPasswordCorrectlyHashed).toBe(true);
  })

  it('should not be able to register with same email twice', async () => {

    const email = 'johndoe@example.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: '12345678'
    })

    await expect(( ) => 
      sut.execute({
        name: 'John Doe',
        email,
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);

  })
})