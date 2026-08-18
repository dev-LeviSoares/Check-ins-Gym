import type { CheckIn } from "../generated/prisma/client.js";
import type { CheckInsRepository } from "../repositories/check-ins-repositories.js";
import type { GymsRepository } from "../repositories/gyms-repository.js";
import { getDistanceBetweenCoordinates } from "../utils/get-distance-between-coordinates.js";
import { MaxDistanceError } from "./errors/max-distance-error.js";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface CheckInServiceRequest {
 userId: string;
 gymId: string
 userLatitude: number;
 userLongitude: number;
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInsService {
  constructor(private checkInsRepository: CheckInsRepository, private gymsRepository: GymsRepository) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {

    const gym = await this.gymsRepository.findById(gymId);

    if(!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude},
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber()
      }
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if(distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError();
    }

    const checkIn = await this.checkInsRepository.create({
      gymId,
      user_id: userId
    })

    return {
      checkIn
    }
  }
}
