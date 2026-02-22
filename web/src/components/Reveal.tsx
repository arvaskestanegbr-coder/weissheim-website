import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealFrom = "left" | "right" | "up" | "down";

interface RevealProps {
  children: ReactNode;
  className?: string;
  from?: RevealFrom;
  distance?: number;
  delayMs?: number;
  durationMs?: number;
  once?: boolean;
}

export default function Reveal({
  children,
  className = "",
  from = "up",
  distance = 28,
  delayMs = 0,
  durationMs = 900,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromVars: gsap.TweenVars = { opacity: 0 };
    if (from === "up") fromVars.y = distance;
    if (from === "down") fromVars.y = -distance;
    if (from === "left") fromVars.x = -distance;
    if (from === "right") fromVars.x = distance;

    gsap.set(el, fromVars);

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: durationMs / 1000,
          delay: delayMs / 1000,
          ease: "power3.out",
        });
      },
    });

    return () => st.kill();
  }, [from, distance, delayMs, durationMs, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
