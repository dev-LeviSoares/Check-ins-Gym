import { prisma } from "../../lib/prisma.js";
import { Prisma, type User } from "../../generated/prisma/client.js";
import type { UsersRepository } from "../users-repository.js";

export class PrismaUsersRepository implements UsersRepository {  
  // Pense no Prisma.UserCreateInput como um CreateUserDTO;

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    });

    return user
  }

  async findById(id: string): Promise<User | null> {
    const userId = await prisma.user.findUnique({ 
      where: {
        id
      }
    })

    return userId;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })
    return user;
  }
}