import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymService } from "./create-gym.js";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository.js";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymService;

describe('Create Gym Use Case', () => {

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymService(gymsRepository);
  })

  it('should be able to create gym', async () => {
    
    const { gym } = await sut.execute({
      title: 'Javascript',
      description: null,
      phone: null,
      latitude: -12.845773326785155,
      longitude: -39.09195809321561
    })

    await expect(gym.id).toEqual(expect.any(String));

  })
})