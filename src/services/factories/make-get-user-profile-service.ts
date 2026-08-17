import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository.js";
import { GetUserProfileService } from "../get-user-profile.js";

export function makeGetUserProfileService() {
  // Dependency Inverison Principle
  const usersRepository = new PrismaUsersRepository(); // Instancio o repo
  const useCase = new GetUserProfileService(usersRepository) // Define o repo no constrututor da classe

  return useCase;
}  