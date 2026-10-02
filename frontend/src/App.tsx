import { useCallback, useEffect, useState } from "react";
import { fetchNextMeme, resetSwipes, sendSwipe, type Direction, type Meme } from "./api";
import { EmptyState } from "./EmptyState";
import { MemeCard } from "./MemeCard";

export function App() {
  const [meme, setMeme] = useState<Meme | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      setMeme(await fetchNextMeme());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function swipe(direction: Direction) {
    if (!meme) return;
    setError(null);
    try {
      await sendSwipe(meme.id, direction);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      return;
    }
    await load();
  }

  async function reset() {
    setError(null);
    try {
      await resetSwipes();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      return;
    }
    await load();
  }

  return (
    <main>
      <h1>Meme-Tinder</h1>
      {error && <p role="alert">Something went wrong: {error}. Is the backend running?</p>}
      {loading && !error && <p>Loading…</p>}
      {!loading && !error && !meme && <EmptyState onReset={reset} />}
      {meme && (
        <>
          <MemeCard meme={meme} />
          <div className="actions">
            <button type="button" className="nope" onClick={() => swipe("nope")}>
              Nope
            </button>
            <button type="button" className="like" onClick={() => swipe("like")}>
              Like
            </button>
          </div>
        </>
      )}
    </main>
  );
}
