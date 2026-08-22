import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchUserCheckInsHistoryService } from "../../../services/factories/make-fetch-user-check-ins-service.js";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fetchUserCheckInsHistoryService = makeFetchUserCheckInsHistoryService();

  const { checkIns } = await fetchUserCheckInsHistoryService.execute({
    // Dependencia vai para a interface da regra de negócio
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({ checkIns });
}
