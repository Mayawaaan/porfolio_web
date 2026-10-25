import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Rocket, Sparkles, TrendingUp, ArrowUpRight, CheckCircle2, Shield, Users } from 'lucide-react';
import { LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

function VentureTiltCard({ venture, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), {
    stiffness: 220,
    damping: 22,
  });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
      }}
      className="rounded-3xl p-7 sm:p-8 border border-[var(--text)]/12 bg-[var(--bg)] shadow-sm hover:shadow-2xl hover:border-[var(--highlight)]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Top Accent Highlight Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--highlight)] opacity-80 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Header: Role and Status */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--highlight)]/10 text-[var(--highlight)] border border-[var(--highlight)]/20">
            <Rocket className="w-3.5 h-3.5" />
            {venture.badge}
          </span>
          <span className="text-xs font-bold text-[var(--text)]/65 font-mono">
            {venture.status}
          </span>
        </div>

        {/* Venture Name & Role */}
        <h3 className="text-2xl font-bold text-[var(--text)] font-['Barlow_Condensed',sans-serif] uppercase tracking-wide group-hover:text-[var(--highlight)] transition-colors mb-1">
          {venture.name}
        </h3>
        <div className="text-xs font-bold uppercase tracking-wider text-[var(--highlight)] mb-3 flex items-center gap-2">
          <span>{venture.role}</span>
          <span className="text-[var(--text)]/60">•</span>
          <span className="text-[var(--text)]/70 font-semibold">{venture.period}</span>
        </div>

        <p className="text-xs sm:text-sm font-medium text-[var(--text)]/70 mb-4 italic">
          "{venture.tagline}"
        </p>

        <p className="text-[var(--text)]/85 text-sm leading-relaxed mb-6">
          {venture.description}
        </p>

        {/* Metrics Highlight Box */}
        <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-[var(--bg)]/70 border border-[var(--text)]/10 mb-6 text-center">
          {venture.metrics.map((metric, mIdx) => (
            <motion.div
              key={mIdx}
              whileHover={{ scale: 1.05 }}
              className="p-1 rounded-xl cursor-default"
            >
              <div className="text-base sm:text-lg font-bold text-[var(--text)] font-['Barlow_Condensed',sans-serif]">
                {metric.value}
              </div>
              <div className="text-[10px] text-[var(--text)]/60 uppercase tracking-tight font-semibold mt-0.5 truncate">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Highlights */}
        <div className="space-y-2 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text)]/65 block mb-2">
            Key Execution Highlights:
          </span>
          {venture.highlights.map((h, hIdx) => (
            <div key={hIdx} className="flex items-start gap-2 text-xs text-[var(--text)]/90">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--highlight)] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer: Tech Stack and Link */}
      <div className="pt-6 border-t border-[var(--text)]/10 mt-auto">
        <div className="flex flex-wrap gap-1.5 mb-5">
          {venture.tech.map((t, tIdx) => (
            <motion.span
              key={tIdx}
              whileHover={{ scale: 1.06, y: -2 }}
              transition={{ type: 'spring', stiffness: 350, damping: 15 }}
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[var(--bg)]/80 border border-[var(--text)]/10 text-[var(--text)] cursor-default"
            >
              {t}
            </motion.span>
          ))}
        </div>

        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href={venture.link}
          target="_blank"
          rel="noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[var(--text)] hover:bg-[var(--highlight)] text-xs font-bold uppercase tracking-wider text-[var(--bg)] transition-all group/btn shadow-md"
        >
          <LinkedinIcon size={14} className="text-[var(--bg)]" />
          <span>Venture Details on LinkedIn</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </motion.a>
      </div>
    </motion.div>
  );
}

const Ventures = () => {
  const { ventures } = portfolioData;

  return (
    <section id="ventures" className="relative py-24 md:py-32 overflow-hidden bg-[var(--bg)]/60 text-[var(--text)]">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-[var(--highlight)]/06 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--highlight)]/04 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 text-[var(--highlight)] text-xs font-bold uppercase tracking-[0.22em] mb-3">
            <span className="w-6 h-[2px] bg-[var(--highlight)]"></span>
            Entrepreneurship & Products
          </div>
          <h2 className="text-3xl sm:text-5xl font-['Barlow_Condensed',sans-serif] font-bold text-[var(--text)] uppercase tracking-tight leading-tight">
            Ventures & Startups <br />
            <span className="text-[var(--highlight)]">engineered from 0 to 1</span>.
          </h2>
          <p className="mt-4 text-[var(--text)]/70 text-base sm:text-lg leading-relaxed">
            Combining technical architecture with entrepreneurial vision — founding, bootstrapping, and scaling autonomous AI products, FinTech infrastructure, and developer ecosystems.
          </p>
        </motion.div>

        {/* Ventures Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ventures.map((venture, index) => (
            <VentureTiltCard key={venture.id} venture={venture} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ventures;
