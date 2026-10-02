import type { Meme } from "./api";

export function MemeCard({ meme }: { meme: Meme }) {
  return (
    <figure className="meme-card">
      <img src={meme.imageUrl} alt={meme.caption} />
      <figcaption>{meme.caption}</figcaption>
    </figure>
  );
}
