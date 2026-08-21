import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreateGymService } from "../../../services/factories/make-create-gyms-service.js";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    phone: z.string().nullable(),
    description: z.string().nullable(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
  });

  const { title, phone, description, latitude, longitude } = createGymBodySchema.parse(request.body);

  const createService = makeCreateGymService();

  await createService.execute({ // Dependencia vai para a interface da regra de negócio
    title,
    phone,
    description,
    latitude,
    longitude
  });

  return reply.status(201).send({ message: "User created"});
}