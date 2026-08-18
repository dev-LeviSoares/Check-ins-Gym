import "@fastify/jwt";

declare module '@fastify/jwt' {
  interface FastifyJwt {
    user: {
      sub: string
    }
  }
}