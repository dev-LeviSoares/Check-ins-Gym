import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository.js";
import { SearchGymService } from "./search-gym.js";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymService;

describe('Search Gym Use Case', () => {

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymService(gymsRepository);
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript Gym',
      latitude: 0,
      longitude: 0,
      description: null,
      phone: null,
    })

    await gymsRepository.create({
      title: 'Typescript Gym',
      latitude: 0,
      longitude: 0,
      description: null,
      phone: null,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1
    })

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym'})
    ]);
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript Gym ${i}`,
        latitude: 0,
        longitude: 0,
        description: null,
        phone: null,
      })
    }
  
    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2
    })
  
    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym 21' }),
      expect.objectContaining({ title: 'Javascript Gym 22' }),
    ])
  })
})