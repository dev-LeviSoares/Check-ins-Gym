import request from "supertest";
import { app } from "../../../app.js";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-use.js";

describe("Create Gym (e2e)", () => {

  beforeAll( async () => {
    await app.ready()
  });

  afterAll( async () => {
    await app.close()
  });

  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const profileResponse = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'Some description',
        phone: '75999999999',
        latitude: -12.845773326785155,
        longitude: -39.09195809321561,
      });

    expect(profileResponse.statusCode).toEqual(201);
  });
});
