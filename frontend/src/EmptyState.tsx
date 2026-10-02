interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <section className="empty-state">
      <h2>You have seen all memes</h2>
      <p>Reset your swipe history to go through them again.</p>
      <button type="button" onClick={onReset}>
        Reset
      </button>
    </section>
  );
}
