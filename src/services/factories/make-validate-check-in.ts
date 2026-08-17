import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository.js";
import { ValidateCheckInService } from "../validate-check-in.js";

export function makeValidateCheckInService() {
  // Dependency Inverison Principle
  const checkInsRepository = new PrismaCheckInsRepository(); // Instancio o repo
  const useCase = new ValidateCheckInService(checkInsRepository) // Define o repo no constrututor da classe

  return useCase;
}  