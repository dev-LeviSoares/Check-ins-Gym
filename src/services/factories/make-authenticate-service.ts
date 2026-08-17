import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository.js";
import { AuthenticateService } from "../authenticate.js";

export function makeAuthenticateService() {
  // Dependency Inverison Principle
  const usersRepository = new PrismaUsersRepository(); // Instancio o repo
  const authenticateService = new AuthenticateService(usersRepository) // Define o repo no constrututor da classe

  return authenticateService;
}  