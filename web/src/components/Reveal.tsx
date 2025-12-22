import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealFrom = "left" | "right" | "up" | "down";

interface RevealProps {
  children: ReactNode;
  className?: string;
  from?: RevealFrom;
  distance?: number;
  delayMs?: number;
  durationMs?: number;
  once?: boolean;
  threshold?: number;
}

export default function Reveal({
  children,
  className = "",
  from = "up",
  distance = 20,
  delayMs = 0,
  durationMs = 700,
  once = true,
  threshold = 0.2,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const initialTransform =
    from === "left"
      ? `translate3d(-${distance}px, 0, 0)`
      : from === "right"
        ? `translate3d(${distance}px, 0, 0)`
        : from === "down"
          ? `translate3d(0, ${distance}px, 0)`
          : `translate3d(0, -${distance}px, 0)`;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0, 0, 0)" : initialTransform,
        transitionProperty: "opacity, transform",
        transitionDuration: `${durationMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delayMs}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
