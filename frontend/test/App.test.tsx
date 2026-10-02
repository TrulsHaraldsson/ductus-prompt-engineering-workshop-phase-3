import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "../src/App";

afterEach(() => vi.unstubAllGlobals());

describe("App", () => {
  it("shows the meme returned by the backend", async () => {
    const meme = { id: "m1", caption: "It works on my machine", imageUrl: "/api/memes/images/m1.svg" };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => meme }));

    render(<App />);

    const image = await screen.findByRole("img", { name: meme.caption });
    expect(image).toHaveAttribute("src", meme.imageUrl);
  });

  it("shows an error message when the backend fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));

    render(<App />);

    expect(await screen.findByRole("alert")).toHaveTextContent("Could not load a meme");
  });
});
