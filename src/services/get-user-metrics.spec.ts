import { expect, describe, it, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository.js";
import { GetUserMetricsService } from "./get-user-metrics.js";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsService;

describe('Get User MEtrics Use Case', () => {

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsService(checkInsRepository);
  })

  it('should be able to get check-ins count from metrics', async () => {

    await checkInsRepository.create({
      gymId: 'gym-01',
      user_id: 'user-01'
    }) 

    await checkInsRepository.create({
      gymId: 'gym-02',
      user_id: 'user-01'
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2);
  })
})