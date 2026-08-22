import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeSearchGymService } from "../../../services/factories/make-search-gym-service.js";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q:  z.string(),
    page: z.coerce.number().min(1).default(1)
  });

  const { page, q } = searchGymsQuerySchema.parse(request.query);

  const searchGymsService= makeSearchGymService();

  const { gyms } = await searchGymsService.execute({ // Dependencia vai para a interface da regra de negócio
    query: q,
    page
  });

  return reply.status(200).send({ gyms });
}