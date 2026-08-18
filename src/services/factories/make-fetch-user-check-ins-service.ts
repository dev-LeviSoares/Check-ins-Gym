import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository.js";
import { FetchUserCheckInsHistoryService } from "../fetch-user-check-ins-history.js";

export function makeAuthenticaService() {
  // Dependency Inverison Principle
  const checkInsService = new PrismaCheckInsRepository(); // Instancio o repo
  const useCase = new FetchUserCheckInsHistoryService(checkInsService) // Define o repo no constrututor da classe

  return useCase;
}  