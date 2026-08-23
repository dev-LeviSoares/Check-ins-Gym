import type { FastifyInstance } from "fastify";
import { register } from "./register.js";
import { authenticate } from "./authenticate.js";
import { profile } from "./profile.js";
import { verifyJWT } from "../../middlewares/verify-jwt.js";
import { refresh } from "./refresh.js";

export async function userRoutes(app: FastifyInstance) {
  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile);
  
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refresh);
}