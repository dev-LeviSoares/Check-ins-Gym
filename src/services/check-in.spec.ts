import { expect, describe, it, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository.js";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository.js";
import { CheckInsService } from "./check-in.js";
import { Decimal } from "@prisma/client/runtime/client";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error.js";
import { MaxDistanceError } from "./errors/max-distance-error.js";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInsService;

describe('Check-in Use Case', () => {

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInsService(checkInsRepository, gymsRepository);

    vi.useFakeTimers(); // Before tests: Data Fake

    await gymsRepository.create({
      id: 'gym-01',
      title: 'NineFitness',
      latitude: -12.843815284918984,
      longitude: -39.096403172195565
    })
  })

  afterEach(() => {
    vi.useRealTimers(); // After teste: Data True
  })

  it('should be able to check in', async () => {

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -12.843815284918984,
      userLongitude: -39.096403172195565
    })

    expect(checkIn.id).toEqual(expect.any(String));

  })
  it('should be able to check in twice in the same day', async () => {

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)); // Vitest date simulation method

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -12.843815284918984,
      userLongitude: -39.096403172195565
    })

    expect(() => 
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -12.843815284918984,
      userLongitude: -39.096403172195565
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);

  })
  it('should be able to check in twice but in diferent days', async () => {

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)); // Vitest date simulation method

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -12.843815284918984,
      userLongitude: -39.096403172195565
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0)); // Vitest date simulation method

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -12.843815284918984,
      userLongitude: -39.096403172195565
    })

    expect(checkIn.id).toEqual(expect.any(String));

  })

  it('should not be able to check in on distance gym', async () => {

    gymsRepository.items.push({
      id: 'gym-02',
      title: 'NineFitness',
      description: '',
      latitude: new Decimal(-12.843815284918984),
      longitude: new Decimal(-39.096403172195565),
      phone: ''
    })

    await expect(() => 
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -12.845773326785155,
        userLongitude: -39.09195809321561
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  })
})