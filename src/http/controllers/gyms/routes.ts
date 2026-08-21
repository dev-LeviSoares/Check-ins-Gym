import type { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt.js";
import { create } from "./create.js";
import { search } from "./search.js";
import { nearby } from "./nearby.js";

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT); // Toda as rotas abaixo desse metodo terão autenticacão e verificação
  
  app.get('/gyms/search', search);
  app.get('/gyms/nearby', nearby);
  
  app.post('/create-gym', create);
}