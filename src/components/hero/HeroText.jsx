import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "../Icons";

const socialConfig = [
  { key: "github", label: "GitHub", icon: GithubIcon },
  { key: "linkedin", label: "LinkedIn", icon: LinkedinIcon },
  { key: "instagram", label: "Instagram", icon: InstagramIcon },
];

export function SocialLinks({ socials = {} }) {
  return (
    <div className="flex items-center gap-2.5">
      {socialConfig.map(({ key, label, icon: Icon }) => {
        const href =
          typeof socials[key] === "string"
            ? socials[key]
            : socials[key]?.url;

        if (!href) return null;

        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-[var(--text)]/15 bg-[var(--text)]/[0.03] text-[var(--text)]/75 transition-all duration-300 hover:border-[var(--highlight)] hover:bg-[var(--highlight)] hover:text-[var(--bg)]"
          >
            <Icon
              size={16}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </a>
        );
      })}
    </div>
  );
}

export default function HeroText({
  personal = {},
  stats = [],
  motionProps,
}) {
  const name = personal.name || "AYAN MAGARDEY";
  const firstName = name.split(" ")[0] || "AYAN";
  const lastName = name.split(" ").slice(1).join(" ") || "MAGARDEY";
  const role = personal.currentRole || "Creative Developer";
  const company = personal.currentCompany || "Independent";
  const tagline =
    personal.tagline ||
    "Engineering digital experiences at the intersection of code, motion and imagination.";

  return (
    <div className="relative z-20 flex w-full flex-col items-start rounded-3xl backdrop-blur-sm bg-[var(--bg)]/60 p-5 sm:p-8 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
      {/* Availability + Role Eyebrow */}
      <motion.div
        {...motionProps(0.05, 14)}
        className="mb-6 flex flex-wrap items-center gap-3"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--text)]/15 bg-[var(--bg)] px-3.5 py-1.5 backdrop-blur-sm shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--highlight)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--highlight)]" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text)]/80">
            {personal.availableForHire === false
              ? "Currently Unavailable"
              : "Available for Select Projects"}
          </span>
        </div>

        <span className="h-px w-6 bg-[var(--highlight)]" />

        <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--highlight)]">
          {role}
        </span>
      </motion.div>

      {/* Monumental Display Name */}
      <motion.h1
        {...motionProps(0.15, 34)}
        className="w-full font-['Barlow_Condensed',sans-serif] text-[clamp(3.8rem,7.5vw,9.2rem)] font-black uppercase leading-[0.8] tracking-[-0.04em] text-[var(--text)]"
      >
        <span className="block">{firstName}</span>
        <span className="mt-2 block whitespace-nowrap text-[var(--text)]">
          {lastName}
          <span className="text-[var(--highlight)]">.</span>
        </span>
      </motion.h1>

      {/* Tagline & Company */}
      <motion.div
        {...motionProps(0.28, 20)}
        className="mt-8 flex w-full max-w-2xl items-start gap-4 sm:mt-10"
      >
        <div className="mt-1 h-14 w-[2.5px] shrink-0 bg-[var(--highlight)]" />
        <div>
          <p className="w-full text-sm leading-7 text-[var(--text)]/85 sm:text-base sm:leading-8">
            {tagline}
          </p>
          <p className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text)]/65">
            {company}
          </p>
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div
        {...motionProps(0.38, 18)}
        className="mt-8 flex flex-wrap items-center gap-3.5 sm:mt-10"
      >
        <a
          href="#projects"
          className="group inline-flex min-h-12 items-center gap-7 bg-[var(--text)] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--bg)] shadow-md transition-colors duration-300 hover:bg-[var(--highlight)]"
        >
          Explore my work
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>

        <a
          href="#contact"
          className="group inline-flex min-h-12 items-center gap-3 border border-[var(--text)]/25 bg-[var(--bg)] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--text)] transition-all duration-300 hover:border-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)]"
        >
          <Mail size={15} className="text-[var(--highlight)]" />
          Get in touch
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </motion.div>

      {/* Social Links */}
      <motion.div
        {...motionProps(0.48, 12)}
        className="mt-8 sm:mt-10"
      >
        <SocialLinks socials={personal.socials} />
      </motion.div>
    </div>
  );
}
