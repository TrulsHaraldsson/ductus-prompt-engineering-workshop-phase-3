import "@testing-library/jest-dom/vitest";

// jsdom has no PointerEvent, so Testing Library would drop clientX and pointerId. Reuse MouseEvent.
if (!window.PointerEvent) {
  class PointerEvent extends MouseEvent {
    pointerId: number;
    constructor(type: string, init: PointerEventInit = {}) {
      super(type, init);
      this.pointerId = init.pointerId ?? 0;
    }
  }
  window.PointerEvent = PointerEvent as typeof window.PointerEvent;
}
