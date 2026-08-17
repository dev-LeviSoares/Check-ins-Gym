import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository.js";
import { FetchNearbyGymsService } from "../fetch-nearby-gyms.js";

export function makeFetchNearbyGymsService() {
  // Dependency Inverison Principle
  const gymsRepository = new PrismaGymsRepository(); // Instancio o repo
  const useCase = new FetchNearbyGymsService(gymsRepository) // Define o repo no constrututor da classe

  return useCase;
}  