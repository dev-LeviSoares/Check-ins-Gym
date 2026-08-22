import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCheckInService } from "../../../services/factories/make-check-in-service.js";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema =  z.object({
    gymId: z.string()
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
  });
  
  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

  const checkInService = makeCheckInService();

  await checkInService.execute({ // Dependencia vai para a interface da regra de negócio
    userId: request.user.sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send({ message: "CheckIn created"});
}