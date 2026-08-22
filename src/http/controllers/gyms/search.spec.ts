import request from "supertest";
import { app } from "../../../app.js";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-use.js";

describe("Search Gym (e2e)", () => {

  beforeAll( async () => {
    await app.ready()
  });

  afterAll( async () => {
    await app.close()
  });

  it("should be able search gyms by title", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'Some description',
        phone: '75999999999',
        latitude: -12.845773326785155,
        longitude: -39.09195809321561,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '75999999999',
        latitude: -12.845773326785155,
        longitude: -39.09195809321561,
      });

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'JavaScript'
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym'
      })
    ]);
  });
});
