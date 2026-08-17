import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository.js";
import { CreateGymService } from "../create-gym.js";

export function makeCreateGymService() {
  // Dependency Inverison Principle
  const gymsRepository = new PrismaGymsRepository(); // Instancio o repo
  const useCase = new CreateGymService(gymsRepository) // Define o repo no constrututor da classe

  return useCase;
}  