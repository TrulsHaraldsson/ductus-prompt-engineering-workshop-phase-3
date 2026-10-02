import { seedMemes, type SeedMeme } from "./seed.js";

export interface Meme {
  id: string;
  caption: string;
  imageUrl: string;
}

export const IMAGE_PATH = "/api/memes/images";

export interface MemeCatalog {
  list(): Meme[];
  getById(id: string): Meme | undefined;
}

function toMeme(seed: SeedMeme): Meme {
  return { id: seed.id, caption: seed.caption, imageUrl: `${IMAGE_PATH}/${seed.file}` };
}

export function createMemeCatalog(seeds: SeedMeme[] = seedMemes): MemeCatalog {
  const memes = seeds.map(toMeme);
  return {
    list: () => [...memes],
    getById: (id) => memes.find((meme) => meme.id === id),
  };
}
