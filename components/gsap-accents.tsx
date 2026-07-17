"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function GsapAccents() {
  const orbOne = useRef<HTMLDivElement | null>(null);
  const orbTwo = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orbOne.current, {
        y: -18,
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      gsap.to(orbTwo.current, {
        y: 14,
        x: 10,
        duration: 6.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        ref={orbOne}
        className="absolute left-[8%] top-[14%] h-32 w-32 rounded-full bg-pink-500/20 blur-3xl"
      />
      <div
        ref={orbTwo}
        className="absolute right-[10%] top-[20%] h-40 w-40 rounded-full bg-cyan-400/18 blur-3xl"
      />
    </div>
  );
}