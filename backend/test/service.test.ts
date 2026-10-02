import { describe, expect, it } from "vitest";
import { createMemeCatalog } from "../src/memes/catalog.js";
import { createInMemorySwipeRepository } from "../src/swipes/repository.js";
import { createSwipeService, UnknownMemeError } from "../src/swipes/service.js";

function setup() {
  const catalog = createMemeCatalog([
    { id: "a", caption: "A", file: "a.svg" },
    { id: "b", caption: "B", file: "b.svg" },
  ]);
  return createSwipeService(catalog, createInMemorySwipeRepository());
}

describe("swipe service", () => {
  it("returns the first meme to a user who has not swiped", () => {
    expect(setup().getNextMeme("u1")?.id).toBe("a");
  });

  it("skips memes the user has liked or noped", () => {
    const service = setup();
    service.recordSwipe("u1", "a", "like");
    expect(service.getNextMeme("u1")?.id).toBe("b");
    service.recordSwipe("u1", "b", "nope");
    expect(service.getNextMeme("u1")).toBeNull();
  });

  it("returns the recorded swipe", () => {
    expect(setup().recordSwipe("u1", "a", "like")).toEqual({ memeId: "a", direction: "like" });
  });

  it("keeps the first swipe when the same meme is swiped again", () => {
    const service = setup();
    service.recordSwipe("u1", "a", "like");

    expect(service.recordSwipe("u1", "a", "nope")).toEqual({ memeId: "a", direction: "like" });
    expect(service.getNextMeme("u1")?.id).toBe("b");
  });

  it("keeps swipe history separate per user", () => {
    const service = setup();
    service.recordSwipe("u1", "a", "like");
    expect(service.getNextMeme("u2")?.id).toBe("a");
  });

  it("rejects an unknown meme id", () => {
    expect(() => setup().recordSwipe("u1", "nope-such-meme", "like")).toThrow(UnknownMemeError);
  });
});
