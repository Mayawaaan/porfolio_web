import React, { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Aperture, Plus, Sparkles as SparklesIcon } from "lucide-react";
import { HERO_PHOTO, PHOTO_FILTERS } from "./HeroConfig";

/* -------------------------------------------------------
   EDITORIAL STUDIO PORTRAIT PLACEHOLDER
   (Renders automatically if image fails to load)
------------------------------------------------------- */

function EditorialPortraitPlaceholder({ name, role }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden bg-[var(--text)] p-6 text-[var(--bg)]">
      {/* Studio Highlight Backlight */}
      <div className="pointer-events-none absolute top-[18%] h-52 w-52 rounded-full bg-[var(--highlight)]/25 blur-3xl" />

      {/* Architectural Viewfinder SVG & Bust */}
      <svg
        viewBox="0 0 400 500"
        fill="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        {/* Arch Guide Lines */}
        <path
          d="M75 500V210C75 140.964 130.964 85 200 85C269.036 85 325 140.964 325 210V500"
          stroke="var(--bg)"
          strokeOpacity="0.14"
          strokeWidth="1"
        />
        <circle
          cx="200"
          cy="195"
          r="92"
          stroke="var(--highlight)"
          strokeOpacity="0.5"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
        <line
          x1="200"
          y1="40"
          x2="200"
          y2="460"
          stroke="var(--bg)"
          strokeOpacity="0.06"
        />
        <line
          x1="40"
          y1="195"
          x2="360"
          y2="195"
          stroke="var(--bg)"
          strokeOpacity="0.06"
        />

        {/* Sculpted Editorial Bust Silhouette */}
        <circle
          cx="200"
          cy="182"
          r="46"
          fill="var(--text)"
          stroke="var(--bg)"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
        <path
          d="M100 460C100 355 142 292 200 292C258 292 300 355 300 460"
          fill="var(--text)"
          stroke="var(--highlight)"
          strokeOpacity="0.6"
          strokeWidth="1.5"
        />
      </svg>

      {/* Top Camera Telemetry */}
      <div className="relative z-10 flex w-full items-center justify-between text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--bg)]/50">
        <span>50MM // F1.4</span>
        <span className="flex items-center gap-1.5 text-[var(--highlight)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--highlight)]" />
          STUDIO PORTRAIT
        </span>
      </div>

      {/* Center Monogram & Role */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center">
        <span className="font-['Barlow_Condensed',sans-serif] text-6xl font-black tracking-tight text-[var(--bg)] sm:text-7xl">
          {initials}
          <span className="text-[var(--highlight)]">.</span>
        </span>
        <span className="mt-2 rounded-full border border-[var(--bg)]/15 bg-[var(--text)]/80 px-3.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--bg)] backdrop-blur-sm">
          {role}
        </span>
      </div>

      {/* Bottom Viewfinder Crosshair */}
      <div className="relative z-10 flex w-full items-center justify-between text-[8px] font-semibold uppercase tracking-[0.22em] text-[var(--bg)]/40">
        <span>ISO 100</span>
        <span>PORTRAIT SLOT</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   ROTATING SWISS TYPOGRAPHIC SEAL
------------------------------------------------------- */

function RotatingAtelierSeal() {
  return (
    <div className="pointer-events-none absolute -bottom-4 -left-4 z-40 flex h-20 w-20 items-center justify-center rounded-full border border-[var(--text)]/15 bg-[var(--bg)]/95 shadow-xl backdrop-blur-md sm:-bottom-5 sm:-left-5 sm:h-24 sm:w-24">
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        viewBox="0 0 100 100"
        className="h-full w-full p-1.5"
      >
        <defs>
          <path
            id="sealCirclePath"
            d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          />
        </defs>
        <text
          fill="var(--text)"
          fontSize="7.3"
          fontWeight="700"
          letterSpacing="2.35"
        >
          <textPath href="#sealCirclePath">
            DIGITAL ARCHITECTURE • BESPOKE CRAFT •
          </textPath>
        </text>
      </motion.svg>

      <div className="absolute flex h-7 w-7 items-center justify-center rounded-full bg-[var(--highlight)] text-[var(--bg)] sm:h-8 sm:w-8">
        <Aperture size={14} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   HERO PORTRAIT STAGE
------------------------------------------------------- */

export default function HeroPortrait({
  name,
  role,
  motionProps,
  prefersReducedMotion,
}) {
  const [imgError, setImgError] = useState(false);
  const [activeFilter, setActiveFilter] = useState(PHOTO_FILTERS[0]);

  // Interactive 3D Tilt on the Gallery Portrait Monolith
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 160,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 160,
    damping: 22,
  });

  const handleCardMove = (event) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleCardLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      {...motionProps(0.2, 18)}
      className="relative mx-auto flex h-[500px] w-full max-w-[600px] items-center justify-center sm:h-[600px] lg:h-[min(76vh,740px)]"
    >
      {/* Architectural Background Compass Ring (SVG) */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        className="pointer-events-none absolute inset-0 m-auto h-[94%] w-[94%] opacity-35"
      >
        <circle
          cx="250"
          cy="250"
          r="230"
          stroke="var(--text)"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
        <circle
          cx="250"
          cy="250"
          r="195"
          stroke="var(--highlight)"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
      </svg>

      {/* SWISS GALLERY PASSPARTOUT MONOLITH */}
      <motion.div
        onMouseMove={handleCardMove}
        onMouseLeave={handleCardLeave}
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformPerspective: 1200,
        }}
        className="group relative z-20 flex h-[88%] w-[84%] max-w-[450px] flex-col justify-between rounded-[22px] border border-[var(--text)]/20 bg-[var(--bg)] p-3.5 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.25)] sm:p-4"
      >
        {/* Corner Registration Crosshairs on the Mat Board */}
        <Plus
          size={10}
          className="pointer-events-none absolute left-2 top-2 text-[var(--text)]/40"
        />
        <Plus
          size={10}
          className="pointer-events-none absolute right-2 top-2 text-[var(--text)]/40"
        />

        {/* Top Mat Header: Plate Index + Live Photo Grade Switcher */}
        <div className="relative z-30 mb-2.5 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--highlight)]" />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--text)]">
              PLATE // 01
            </span>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-1 rounded-full border border-[var(--text)]/15 bg-[var(--bg)] p-0.5">
            {PHOTO_FILTERS.map((filter) => {
              const isActive = activeFilter.id === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.16em] transition-all ${
                    isActive
                      ? "bg-[var(--text)] text-[var(--bg)]"
                      : "text-[var(--text)]/60 hover:text-[var(--text)]"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Inner Sculpted Arch-Top Portrait Viewport */}
        <div className="relative flex-1 overflow-hidden rounded-t-[110px] rounded-b-xl border border-[var(--text)]/20 bg-[var(--text)]">
          {/* Subtle Studio Rim Lighting Overlay */}
          <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_50%_28%,transparent_48%,rgba(0,0,0,0.75)_100%)]" />
          <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[var(--text)] via-transparent to-transparent opacity-80" />

          {/* Real Person Portrait or Studio Placeholder */}
          {!imgError ? (
            <img
              src={HERO_PHOTO}
              alt={`${name} — ${role}`}
              fetchPriority="high"
              className={`relative z-10 h-full w-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.03] ${activeFilter.className}`}
              onError={() => setImgError(true)}
            />
          ) : (
            <EditorialPortraitPlaceholder name={name} role={role} />
          )}

          {/* Subtle Viewfinder Corner Brackets Inside Photo */}
          <div className="pointer-events-none absolute bottom-3 left-3 z-30 h-3 w-3 border-b border-l border-[var(--bg)]/40" />
          <div className="pointer-events-none absolute bottom-3 right-3 z-30 h-3 w-3 border-b border-r border-[var(--bg)]/40" />
        </div>

        {/* Bottom Gallery Dossier Strip Built Into the Mat */}
        <div className="relative mt-3 flex items-center justify-between border-t border-[var(--text)]/12 pt-2.5 px-1">
          {/* Minimalist Editorial Barcode Graphic */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="flex h-6 items-end gap-[2px] opacity-65">
              <span className="h-full w-[2px] bg-[var(--text)]" />
              <span className="h-4 w-[1px] bg-[var(--text)]" />
              <span className="h-full w-[3px] bg-[var(--highlight)]" />
              <span className="h-3 w-[1.5px] bg-[var(--text)]" />
              <span className="h-full w-[1px] bg-[var(--text)]" />
              <span className="h-5 w-[2px] bg-[var(--text)]" />
            </div>
            <span className="font-['Barlow_Condensed',sans-serif] text-xs font-bold tracking-[0.18em] text-[var(--text)]/60">
              001
            </span>
          </div>
        </div>

        {/* Rotating Swiss Typographic Stamp (Bottom-Left Corner) */}
        <RotatingAtelierSeal />
      </motion.div>

      {/* Floating Spec Pill — Bottom Right */}
      <div className="absolute bottom-[10%] right-0 z-40 flex items-center gap-2 rounded-full border border-[var(--text)]/15 bg-[var(--text)] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--bg)] shadow-lg sm:-right-3">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--highlight)]" />
        Kinetic Atelier / 26
      </div>
    </motion.div>
  );
}
