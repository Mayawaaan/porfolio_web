import React from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { HERO_PHOTO } from "./hero/HeroConfig";
import HeroText from "./hero/HeroText";

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
      {/* 1. Redefined Background Image Stage — object-contain anchored on the left */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="relative h-full w-full">
          <img
            src={HERO_PHOTO}
            alt={`${personal.name} — ${personal.currentRole}`}
            fetchPriority="high"
            className="h-full w-full object-contain object-left filter contrast-[1.10] saturate-[1.08] brightness-[0.98] transition-all duration-700"
          />

          {/* Desktop Right Blend: Gracefully dissolves photo into canvas for pristine text contrast */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-[var(--bg)]/40 via-40% to-[var(--bg)] to-75%" />

          {/* Mobile / Tablet vertical blend */}
          <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[var(--bg)]/75 via-[var(--bg)]/90 to-[var(--bg)]" />

          {/* Top Header Transition */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/80 to-transparent" />

          {/* Bottom Transition */}
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/80 to-transparent" />

          {/* Dynamic Theme Glow Accent */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_45%,color-mix(in_srgb,var(--highlight)_12%,transparent),transparent_55%)]" />
        </div>
      </div>

      {/* 2. Architectural Grid Lines */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--text)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--text)_5%,transparent)_1px,transparent_1px)] bg-[size:84px_84px] opacity-60" />

      {/* 3. Main Hero Area — Content shifted to the Right side */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-[1600px] justify-end px-5 sm:px-8 lg:px-14">
        {/* Right-aligned content wrapper */}
        <div className="w-full lg:max-w-[56%] xl:max-w-[50%]">
          <HeroText
            personal={personal}
            stats={stats}
            motionProps={motionProps}
          />
        </div>
      </div>

      {/* 4. Left-anchored Editorial Location Badge (Redefining image subject) */}
      <div className="hidden lg:flex pointer-events-auto absolute bottom-12 left-8 xl:left-14 z-20 items-center gap-2.5 rounded-full border border-[var(--text)]/15 bg-[var(--bg)]/85 px-4 py-2 backdrop-blur-md shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--highlight)] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--highlight)]" />
        </span>
        <MapPin size={12} className="text-[var(--highlight)]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text)]">
          Paris // Arc De Triomphe
        </span>
        <span className="text-[9px] font-mono text-[var(--text)]/50">48.8738° N</span>
      </div>

      {/* 5. Bottom Scroll Cue */}
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