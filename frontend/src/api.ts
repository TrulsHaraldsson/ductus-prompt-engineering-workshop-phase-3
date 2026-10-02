export interface Meme {
  id: string;
  caption: string;
  imageUrl: string;
}

export async function fetchNextMeme(): Promise<Meme> {
  const res = await fetch("/api/memes/next");
  if (!res.ok) throw new Error(`Failed to load meme (HTTP ${res.status})`);
  return res.json();
}
