import { useEffect, useState } from "react";
import { fetchNextMeme, type Meme } from "./api";
import { MemeCard } from "./MemeCard";

export function App() {
  const [meme, setMeme] = useState<Meme | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNextMeme()
      .then(setMeme)
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <main>
      <h1>Meme-Tinder</h1>
      {error && <p role="alert">Could not load a meme: {error}</p>}
      {!error && !meme && <p>Loading…</p>}
      {meme && <MemeCard meme={meme} />}
    </main>
  );
}
