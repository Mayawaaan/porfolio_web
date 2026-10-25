import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Award, Briefcase, GraduationCap, Rocket, CheckCircle } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const defaultStats = [
  {
    value: "Accenture",
    label: "Strategy & Consulting",
    subtext: "GenAI Division",
    icon: Briefcase,
    highlight: true,
  },
  {
    value: "4+ Years",
    label: "Enterprise Systems",
    subtext: "Infosys Senior SE (MVP)",
    icon: Trophy,
    highlight: false,
  },
  {
    value: "Great Lakes",
    label: "Dual Major MBA",
    subtext: "Finance & Data Science",
    icon: GraduationCap,
    highlight: true,
  },
  {
    value: "IIMB Winner",
    label: "National Case Champion",
    subtext: "Venix 2025 Fit-for-B",
    icon: Award,
    highlight: false,
  },
  {
    value: "2 Startups",
    label: "Founder & Scaled",
    subtext: "C Sec Hub & Captionate",
    icon: Rocket,
    highlight: true,
  },
  {
    value: "AIR 4",
    label: "National Honors",
    subtext: "Essay & Thought Leadership",
    icon: Trophy,
    highlight: false,
  },
  {
    value: "IÉSEG Paris",
    label: "International Immersion",
    subtext: "Grade A · Business Strategy",
    icon: GraduationCap,
    highlight: false,
  },
  {
    value: "Gold Medalist",
    label: "Science & Math",
    subtext: "IMO & NSO Olympiads",
    icon: Sparkles,
    highlight: true,
  },
  {
    value: "GCP Certified",
    label: "Generative AI",
    subtext: "Google Cloud Platform",
    icon: CheckCircle,
    highlight: false,
  },
];

export default function StatsMarquee({ stats = defaultStats, className = "" }) {
  // Double items for seamless infinite marquee loop
  const marqueeItems = [...stats, ...stats];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      aria-label="Career metrics and accolades marquee"
      className={`relative w-full overflow-hidden border-y border-[var(--text)]/20 bg-[var(--text)] py-3.5 text-[var(--bg)] shadow-[0_12px_32px_rgba(0,0,0,0.25)] ${className}`}
    >
      {/* Left & Right Vignette Blur Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[var(--text)] to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[var(--text)] to-transparent sm:w-28" />

      {/* Marquee Track */}
      <div className="animate-marquee-scroll flex items-center gap-6 sm:gap-10">
        {marqueeItems.map((item, index) => {
          const Icon = item.icon || Sparkles;
          return (
            <div
              key={`${item.value}-${index}`}
              className="group flex shrink-0 items-center gap-6 sm:gap-8"
            >
              {/* Stat Metric Card */}
              <div className="flex items-center gap-3.5 rounded-xl border border-[var(--bg)]/10 bg-[var(--bg)]/[0.08] px-4 py-2 transition-all duration-300 group-hover:border-[var(--highlight)]/50 group-hover:bg-[var(--bg)]/[0.14]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--highlight)]/15 text-[var(--highlight)] transition-transform duration-300 group-hover:scale-110">
                  <Icon size={16} />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-['Barlow_Condensed',sans-serif] text-xl font-bold uppercase tracking-tight text-[var(--bg)] sm:text-2xl">
                      {item.value}
                    </span>
                    {item.highlight && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--highlight)]" />
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--bg)]/75">
                      {item.label}
                    </span>
                    {item.subtext && (
                      <>
                        <span className="text-[8px] text-[var(--highlight)]">•</span>
                        <span className="text-[9px] font-medium tracking-wider text-[var(--highlight)]/90">
                          {item.subtext}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Architectural Separator */}
              <div className="flex items-center gap-2 text-[var(--highlight)]/60">
                <span className="text-xs font-mono font-bold tracking-widest text-[var(--highlight)]">
                  ✦
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
