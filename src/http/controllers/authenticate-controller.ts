import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "../../services/errors/invalid-credentials-error.js";
import { makeAuthenticaService } from "../../services/factories/make-authenticate-service.js";


export async function authenticate (request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  })

  const { email, password } = registerBodySchema.parse(request.body);

  try {
    const authenticateService = makeAuthenticaService();

    await authenticateService.execute({ // Dependencia vai para a interface da regra de negócio
      email,
      password
    });

  } catch (err) {
    if( err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message})
    }

    return reply.status(500).send() // TODO: fix me
  }

  return reply.status(200).send({ message: "User authenticated"})
}