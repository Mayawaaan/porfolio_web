import React from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import HeroText from "./hero/HeroText";
import HeroPortrait from "./hero/HeroPortrait";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const personal = portfolioData?.personal ?? {};
  const stats = portfolioData?.stats ?? [];

  const motionProps = (delay = 0, distance = 26) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: distance },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.8,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        };

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen flex-col justify-between overflow-hidden bg-[var(--bg)] pt-24 pb-8 text-[var(--text)] lg:pt-28 lg:pb-10"
    >
      {/* Architectural Grid Lines */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--text)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--text)_5%,transparent)_1px,transparent_1px)] bg-[size:84px_84px] opacity-75" />

      {/* Warm Ambient Vignette */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_45%,color-mix(in_srgb,var(--highlight)_10%,transparent),transparent_48%),linear-gradient(to_bottom,transparent_80%,var(--bg)_100%)]" />

      {/* Main 50 / 50 Grid: Text occupies half the space, Portrait occupies the other half */}
      <div className="relative z-10 mx-auto my-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-14">
        {/* Left Column (50%): Text & Actions */}
        <div className="w-full">
          <HeroText
            personal={personal}
            stats={stats}
            motionProps={motionProps}
          />
        </div>

        {/* Right Column (50%): Editorial Portrait Photo (Clean, No 3D) */}
        <div className="w-full">
          <HeroPortrait
            name={personal.name}
            role={personal.currentRole}
            motionProps={motionProps}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-20 mx-auto mt-8 flex w-full max-w-[1600px] items-center justify-between px-5 pt-4 sm:px-8 lg:px-14">
        <a
          href="#projects"
          className="group inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text)]/65 transition-colors hover:text-[var(--highlight)]"
        >
          <ArrowDown
            size={14}
            className="transition-transform duration-300 group-hover:translate-y-1"
          />
          Scroll to explore
        </a>

        <span className="hidden text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--text)]/50 sm:block">
          Independent mind. Digital craft.
        </span>
      </div>
    </section>
  );
}