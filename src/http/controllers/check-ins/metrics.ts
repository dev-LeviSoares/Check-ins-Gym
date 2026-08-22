import type { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserMetricsService } from "../../../services/factories/make-get-user-metrics-service.js";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsService = makeGetUserMetricsService();

  const { checkInsCount } = await getUserMetricsService.execute({
    // Dependencia vai para a interface da regra de negócio
    userId: request.user.sub,
  });

  return reply.status(201).send({ checkInsCount });
}
