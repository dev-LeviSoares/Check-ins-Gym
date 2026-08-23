import type { FastifyInstance } from "fastify";
import request from "supertest";
import { prisma } from "../../lib/prisma.js";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await request(app.server).post("/users").send({
    name: "John Doe",
    email: "JohnDoe@example.com",
    password: "123456",
  });

  if (isAdmin) {
    await prisma.user.update({
      where: { email: "JohnDoe@example.com" },
      data: { role: "ADMIN" },
    });
  }

  const authResponse = await request(app.server).post("/sessions").send({
    email: "JohnDoe@example.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return {
    token,
  };
}
