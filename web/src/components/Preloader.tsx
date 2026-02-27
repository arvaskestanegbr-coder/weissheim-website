import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader() {
    const [visible, setVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Kurzer Preloader, nach 800ms fade out, um die Ladezeit zu "kaschieren" und Animationen sauber starten zu lassen.
        const timer = setTimeout(() => {
            gsap.to(containerRef.current, { // Use ref for targeting
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut",
                onComplete: () => {
                    setVisible(false); // Use setVisible
                    // Event dispatch um anderen Komponenten zu sagen: Preloader ist fertig, Animationen können starten.
                    window.dispatchEvent(new Event("preloader-finished"));
                },
            });
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null; // Use visible

    return (
        <div
            ref={containerRef} // Assign ref
            className="preloader-container fixed inset-0 z-[100] flex items-center justify-center bg-[#FAF8F3] pointer-events-none h-[100dvh]" // Add h-[100dvh]
            aria-hidden="true" // Add aria-hidden
        >
            <div className="flex flex-col items-center gap-4">
                <div className="text-2xl font-bold font-['Playfair_Display'] tracking-widest text-[#0A0A0A]">
                    WEISSHEIM
                </div>
                <div className="w-24 h-[1px] bg-[#0A0A0A]/10 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-full bg-[#C9B99A] -translate-x-full animate-[shimmer_1.5s_infinite]" />
                </div>
            </div>
        </div>
    );
}
