import request from "supertest";
import { app } from "../../../app.js";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-use.js";
import { prisma } from "../../../lib/prisma.js";

describe("History Check-in (e2e)", () => {

  beforeAll( async () => {
    await app.ready()
  });

  afterAll( async () => {
    await app.close()
  });

  it("should be able to list the o history of check-ins", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gymId: gym.id,
          user_id: user.id
        },
        {
          gymId: gym.id, 
          user_id: user.id
        }
      ]
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gymId: gym.id,
        user_id: user.id
      }),
      expect.objectContaining({
        gymId: gym.id,
        user_id: user.id
      }),
    ])
  });
});
