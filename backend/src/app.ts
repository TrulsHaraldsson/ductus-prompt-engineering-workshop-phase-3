import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { IMAGE_PATH, type MemeCatalog } from "./memes/catalog.js";

const assetsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../assets/memes");

export function createApp(catalog: MemeCatalog) {
  const app = express();

  app.use(IMAGE_PATH, express.static(assetsDir));

  // Placeholder: always returns the first meme. Issue #3 replaces this with per-user swipe logic.
  app.get("/api/memes/next", (_req, res) => {
    const [meme] = catalog.list();
    if (!meme) {
      res.status(404).json({ error: "No memes available" });
      return;
    }
    res.json(meme);
  });

  return app;
}
