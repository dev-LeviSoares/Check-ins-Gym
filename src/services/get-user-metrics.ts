import type { CheckIn } from "../generated/prisma/client.js";
import type { CheckInsRepository } from "../repositories/check-ins-repositories.js";

interface GetUserMetricCheckInsHistoryServiceRequest {
 userId: string;
}

interface GetUserCheckMetricInsHistoryServiceResponse {
  checkInsCount: number
}

export class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricCheckInsHistoryServiceRequest): Promise<GetUserCheckMetricInsHistoryServiceResponse> {

    const checkInsCount = await this.checkInsRepository.countByUserId(userId);
    
    return {
      checkInsCount
    }
  }
}
