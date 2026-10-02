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

  it("makes previously swiped memes available again after a reset", () => {
    const service = setup();
    service.recordSwipe("u1", "a", "like");
    service.recordSwipe("u1", "b", "nope");
    expect(service.getNextMeme("u1")).toBeNull();

    service.resetSwipes("u1");

    expect(service.getNextMeme("u1")?.id).toBe("a");
  });

  it("clears likes and nopes on reset", () => {
    const service = setup();
    service.recordSwipe("u1", "a", "like");
    service.recordSwipe("u1", "b", "nope");

    service.resetSwipes("u1");

    // A fresh swipe is stored with its new direction, so nothing from before survived.
    expect(service.recordSwipe("u1", "a", "nope")).toEqual({ memeId: "a", direction: "nope" });
    expect(service.recordSwipe("u1", "b", "like")).toEqual({ memeId: "b", direction: "like" });
  });

  it("only resets the given user", () => {
    const service = setup();
    service.recordSwipe("u1", "a", "like");
    service.recordSwipe("u2", "a", "like");

    service.resetSwipes("u1");

    expect(service.getNextMeme("u1")?.id).toBe("a");
    expect(service.getNextMeme("u2")?.id).toBe("b");
  });

  it("does nothing harmful when resetting a user with no swipes", () => {
    const service = setup();

    expect(() => service.resetSwipes("u1")).not.toThrow();
    expect(() => service.resetSwipes("u1")).not.toThrow();
    expect(service.getNextMeme("u1")?.id).toBe("a");
  });

  it("rejects an unknown meme id", () => {
    expect(() => setup().recordSwipe("u1", "nope-such-meme", "like")).toThrow(UnknownMemeError);
  });
});
