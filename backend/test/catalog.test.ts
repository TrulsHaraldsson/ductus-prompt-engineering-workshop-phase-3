import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { seedMemes } from "../src/memes/seed.js";

describe("seed memes", () => {
  it("has unique ids and an existing image for each meme", () => {
    expect(new Set(seedMemes.map((m) => m.id)).size).toBe(seedMemes.length);
    for (const meme of seedMemes) {
      expect(existsSync(path.resolve(__dirname, "../assets/memes", meme.file))).toBe(true);
    }
  });
});
