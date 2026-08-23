import request from "supertest";
import { app } from "../../../app.js";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-use.js";

describe("Nearby Gym (e2e)", () => {

  beforeAll( async () => {
    await app.ready()
  });

  afterAll( async () => {
    await app.close()
  });

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'Some description',
        phone: '75999999999',
        latitude: -12.845550181048957,
        longitude: -39.09198546217291,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '75999999999',
        latitude: -12.77780158110229,
        longitude: -39.17064065177069,
      });

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -12.845550181048957,
        longitude: -39.09198546217291,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'TypeScript Gym'
      })
    ]);
  });
});
