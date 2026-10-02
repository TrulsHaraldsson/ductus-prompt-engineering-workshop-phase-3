import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "../src/App";

const first = { id: "m1", caption: "It works on my machine", imageUrl: "/api/memes/images/m1.svg" };
const second = { id: "m2", caption: "Friday deploy", imageUrl: "/api/memes/images/m2.svg" };

const ok = (body: unknown) => ({ ok: true, json: async () => body });

afterEach(() => vi.unstubAllGlobals());

describe("App", () => {
  it("shows the meme returned by the backend", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(ok({ meme: first })));

    render(<App />);

    const image = await screen.findByRole("img", { name: first.caption });
    expect(image).toHaveAttribute("src", first.imageUrl);
  });

  it.each([
    ["Like", "like"],
    ["Nope", "nope"],
  ])("sends a %s swipe and shows the next meme", async (label, direction) => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(ok({ meme: first }))
      .mockResolvedValueOnce(ok({ memeId: first.id, direction }))
      .mockResolvedValueOnce(ok({ meme: second }));
    vi.stubGlobal("fetch", fetchMock);
    render(<App />);
    await screen.findByRole("img", { name: first.caption });

    fireEvent.click(screen.getByRole("button", { name: label }));

    expect(await screen.findByRole("img", { name: second.caption })).toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls[1];
    expect(url).toBe("/api/swipes");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)).toEqual({ memeId: first.id, direction });
    expect(init.headers["X-User-Id"]).toEqual(expect.any(String));
  });

  it("does not crash when there are no more memes", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(ok({ meme: null })));

    render(<App />);

    expect(await screen.findByText("No more memes.")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows an error message when the backend fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));

    render(<App />);

    expect(await screen.findByRole("alert")).toHaveTextContent("Something went wrong");
  });

  it("shows an error message when the backend is unreachable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));

    render(<App />);

    expect(await screen.findByRole("alert")).toHaveTextContent("Failed to fetch");
  });

  it("shows an error message when recording a swipe fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(ok({ meme: first })).mockResolvedValueOnce({ ok: false, status: 500 }),
    );
    render(<App />);
    await screen.findByRole("img", { name: first.caption });

    fireEvent.click(screen.getByRole("button", { name: "Like" }));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });
});
