import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Trophy, Award, Medal, Zap, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

const iconMap = {
  Trophy: Trophy,
  Award: Award,
  Medal: Medal,
  Zap: Zap
};

function AchievementTiltCard({ item, index }) {
  const IconComp = iconMap[item.iconName] || Trophy;
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
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
      }}
      className="rounded-3xl border border-[var(--text)]/12 bg-[var(--bg)]/60 p-7 sm:p-8 shadow-sm hover:shadow-2xl hover:border-[var(--highlight)]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
    >
      <div>
        {/* Top Bar: Icon, Year, Badge */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 4 }}
              className="w-12 h-12 rounded-2xl bg-[var(--highlight)]/10 border border-[var(--highlight)]/20 flex items-center justify-center text-[var(--highlight)] group-hover:bg-[var(--highlight)]/20 transition-all duration-200"
            >
              <IconComp className="w-6 h-6" />
            </motion.div>
            <div>
              <span className="text-[11px] font-bold text-[var(--highlight)] uppercase tracking-wider block">
                {item.category}
              </span>
              <span className="text-xs font-mono text-[var(--text)]/65">
                {item.year}
              </span>
            </div>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[var(--bg)] text-[var(--highlight)] border border-[var(--text)]/10 uppercase tracking-wide">
            {item.badge}
          </span>
        </div>

        {/* Title and Organization */}
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] font-['Barlow_Condensed',sans-serif] uppercase tracking-wide mb-2 group-hover:text-[var(--highlight)] transition-colors">
          {item.title}
        </h3>
        <div className="text-xs sm:text-sm font-bold text-[var(--highlight)] mb-1 uppercase tracking-wide">
          {item.organization}
        </div>
        {item.conferredBy && (
          <div className="text-[11px] font-medium text-[var(--text)]/60 mb-3 italic">
            ✦ {item.conferredBy}
          </div>
        )}

        <p className="text-[var(--text)]/85 text-sm leading-relaxed mb-6">
          {item.description}
        </p>
      </div>

      {/* Impact Highlight Box */}
      <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--text)]/10 flex items-start gap-3 mt-auto">
        <CheckCircle2 className="w-4 h-4 text-[var(--highlight)] shrink-0 mt-0.5" />
        <div className="text-xs text-[var(--text)]/90 leading-relaxed">
          <strong className="text-[var(--text)] font-semibold">Impact: </strong>
          {item.impact}
        </div>
      </div>
    </motion.div>
  );
}

const Achievements = () => {
  const { achievements } = portfolioData;

  return (
    <section id="achievements" className="relative py-24 md:py-32 bg-[var(--bg)] text-[var(--text)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[var(--highlight)]/06 rounded-full blur-[140px] pointer-events-none -z-10" />

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
            Honors & Accolades
          </div>
          <h2 className="text-3xl sm:text-5xl font-['Barlow_Condensed',sans-serif] font-bold text-[var(--text)] uppercase tracking-tight leading-tight">
            Recognitions & Achievements.
          </h2>
          <p className="mt-3 text-[var(--text)]/70 text-base leading-relaxed">
            Distinctions spanning corporate enterprise awards, institute academic rankings, top-tier management cohort selections, and national hackathon achievements.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {achievements.map((item, index) => (
            <AchievementTiltCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Bottom LinkedIn Verification Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="mt-16 rounded-3xl border border-[var(--text)] bg-[var(--text)] text-[var(--bg)] p-7 sm:p-9 shadow-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--highlight)]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="text-left relative z-10">
            <h4 className="text-lg sm:text-xl font-bold font-['Barlow_Condensed',sans-serif] uppercase tracking-wide text-[var(--bg)]">
              Endorsed on LinkedIn
            </h4>
            <p className="text-xs sm:text-sm text-[var(--bg)]/85 mt-1">
              View comprehensive recommendations, peer endorsements, and academic honors on Akshat's LinkedIn profile.
            </p>
          </div>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href={portfolioData.personal.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--highlight)] hover:opacity-90 text-[var(--bg)] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md shrink-0"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
