import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository.js";
import { RegisterService } from "../register.js";

export function makeRegisterService() {
  // Dependency Inverison Principle
  const usersRepository = new PrismaUsersRepository(); // Instancio o repo
  const registerService = new RegisterService(usersRepository) // Define o repo no constrututor da classe

  return registerService;
}  