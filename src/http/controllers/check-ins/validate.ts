import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeValidateCheckInService } from "../../../services/factories/make-validate-check-in.js";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)
  const validateCheckInService = makeValidateCheckInService();

  await validateCheckInService.execute({ // Dependencia vai para a interface da regra de negócio
    checkInId
  });

  return reply.status(204).send();
}