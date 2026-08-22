import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchNearbyGymsService } from "../../../services/factories/make-fetch-nearby-gyms-service.js";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 180
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90
    }),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);

  const nearbyGymsService= makeFetchNearbyGymsService();

  const { gyms } = await nearbyGymsService.execute({ // Dependencia vai para a interface da regra de negócio
    userLatitude: latitude,
    userLongitude: longitude
  });

  return reply.status(200).send({ gyms });
}