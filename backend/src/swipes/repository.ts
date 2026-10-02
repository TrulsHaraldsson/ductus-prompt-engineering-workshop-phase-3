export type Direction = "like" | "nope";

export const DIRECTIONS: readonly Direction[] = ["like", "nope"];

export interface Swipe {
  memeId: string;
  direction: Direction;
}

/** Storage seam for swipes. Replace the in-memory implementation to use a real database. */
export interface SwipeRepository {
  listByUser(userId: string): Swipe[];
  add(userId: string, swipe: Swipe): void;
  clearByUser(userId: string): void;
}

export function createInMemorySwipeRepository(): SwipeRepository {
  const swipesByUser = new Map<string, Swipe[]>();
  return {
    listByUser: (userId) => [...(swipesByUser.get(userId) ?? [])],
    add: (userId, swipe) => {
      swipesByUser.set(userId, [...(swipesByUser.get(userId) ?? []), swipe]);
    },
    clearByUser: (userId) => {
      swipesByUser.delete(userId);
    },
  };
}
