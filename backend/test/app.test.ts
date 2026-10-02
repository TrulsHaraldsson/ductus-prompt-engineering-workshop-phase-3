import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { createMemeCatalog } from "../src/memes/catalog.js";

describe("GET /api/memes/next", () => {
  it("returns a meme with an id, caption and image url", async () => {
    const app = createApp(createMemeCatalog());

    const res = await request(app).get("/api/memes/next");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      caption: expect.any(String),
      imageUrl: expect.stringMatching(/\.svg$/),
    });
  });

  it("serves the image the meme points to", async () => {
    const app = createApp(createMemeCatalog());
    const { body } = await request(app).get("/api/memes/next");

    const image = await request(app).get(body.imageUrl);

    expect(image.status).toBe(200);
    expect(image.headers["content-type"]).toContain("image/svg+xml");
  });
});
