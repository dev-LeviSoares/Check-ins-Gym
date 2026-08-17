import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository.js";
import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository.js";
import { SearchGymService } from "../search-gym.js";

export function makeSearchGymService() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymService(gymsRepository) 

  return useCase;
}  