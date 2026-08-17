import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository.js";
import { FetchNearbyGymsService } from "./fetch-nearby-gyms.js";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsService;

describe('Fetch Nearby Gyms Use Case', () => {

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsService(gymsRepository);
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Near(perto) Gym',
      latitude: -12.845550181048957,
      longitude: -39.09198546217291,
      description: null,
      phone: null,
    })

    await gymsRepository.create({
      title: 'Far(longe) Gym',
      latitude: -12.77780158110229,
      longitude: -39.17064065177069,
      description: null,
      phone: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -12.843865559168044,
      userLongitude: -39.096643214972964
    })
    
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near(perto) Gym'})
    ]);
  })
})