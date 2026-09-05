import { useRef } from "react";

/**
 * Enables horizontal finger-swipe navigation for the step-slider hero.
 * The slider is a CSS keyframe animation (20s loop, one slide every 5s),
 * so swiping simply jumps the animation's currentTime by ±5s.
 */
export function useSwipeSlider(sectionRef: React.RefObject<HTMLElement | null>) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || e.changedTouches.length === 0) return;

    const touch = e.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    // Only treat clearly horizontal swipes as slide changes
    if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy)) return;

    const track = sectionRef.current?.querySelector<HTMLElement>(".step-slider-track");
    if (!track) return;

    const animation = track.getAnimations()[0] as Animation | undefined;
    if (!animation) return;

    const LOOP_MS = 20000; // full 4-slide loop
    const STEP_MS = LOOP_MS / 4; // one slide = 5s of the timeline
    const direction = dx < 0 ? 1 : -1; // swipe left = next slide

    const current = typeof animation.currentTime === "number" ? animation.currentTime : 0;
    const currentStep = Math.floor(current / STEP_MS);
    const next = ((((currentStep + direction) * STEP_MS) % LOOP_MS) + LOOP_MS) % LOOP_MS;
    animation.currentTime = next;
  };

  return { onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd };
}
