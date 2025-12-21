"use client";

import Lenis from "lenis";
import { useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import "lenis/dist/lenis.css";

interface SmoothScrollProps {
  children: ReactNode;
}

// Extend window interface to hold Lenis instance
declare global {
  interface Window {
    lenisInstance?: Lenis | null;
  }
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && !window.lenisInstance) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,   
        touchMultiplier: 1.5,
        infinite: false,
      });


      window.lenisInstance = lenis;

      // Animation loop
      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      // Save scroll position
      const handleBeforeUnload = () => {
        sessionStorage.setItem("scrollPosition", String(lenis.scroll));
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        if (window.lenisInstance === lenis) {
          lenis.destroy();
          window.lenisInstance = null;
        }
      };
    }

    // Restore scroll position
    const restoreScroll = () => {
      if (window.lenisInstance) {
        const savedPosition = sessionStorage.getItem("scrollPosition");
        if (savedPosition) {
          window.lenisInstance.scrollTo(parseFloat(savedPosition), {
            immediate: false,
            lock: false,
            force: false,
          });
          sessionStorage.removeItem("scrollPosition");
        }
      }
    };

    restoreScroll();
  }, [pathname]);

  return <>{children}</>;
}
