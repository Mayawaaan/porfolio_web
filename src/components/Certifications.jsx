import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Cloud, TrendingUp, Bot, Cpu, Layers, Code2, Award, CheckCircle, ExternalLink, ShieldCheck, Trophy, Rocket, Medal, Zap } from 'lucide-react';
import { LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

const iconMap = {
  Cloud: Cloud,
  TrendingUp: TrendingUp,
  Bot: Bot,
  Cpu: Cpu,
  Layers: Layers,
  Code2: Code2,
  Trophy: Trophy,
  Rocket: Rocket,
  Medal: Medal,
  Zap: Zap,
  Award: Award
};

function CertTiltCard({ cert, index }) {
  const IconComp = iconMap[cert.iconName] || Award;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [3, -3]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-3, 3]), {
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
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
      }}
      className="rounded-3xl border border-[var(--text)]/12 bg-[var(--bg)] p-6 sm:p-7 shadow-sm hover:shadow-2xl hover:border-[var(--highlight)]/50 transition-all duration-300 flex flex-col justify-between group cursor-default"
    >
      <div>
        {/* Top Bar: Icon & Badge */}
        <div className="flex items-center justify-between mb-5">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 3 }}
            className="w-12 h-12 rounded-xl bg-[var(--highlight)]/10 border border-[var(--highlight)]/20 flex items-center justify-center text-[var(--highlight)] group-hover:bg-[var(--highlight)]/20 transition-all duration-200"
          >
            <IconComp className="w-6 h-6" />
          </motion.div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[var(--bg)] text-[var(--highlight)] border border-[var(--text)]/10 uppercase tracking-wide">
            {cert.badge}
          </span>
        </div>

        {/* Title and Issuer */}
        <h3 className="text-lg font-bold text-[var(--text)] font-['Barlow_Condensed',sans-serif] uppercase tracking-wide mb-1.5 group-hover:text-[var(--highlight)] transition-colors">
          {cert.title}
        </h3>
        <div className="text-xs font-bold text-[var(--highlight)] mb-2 flex items-center gap-1.5 flex-wrap">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{cert.issuer}</span>
          <span className="text-[var(--text)]/60">•</span>
          <span className="text-[var(--text)]/70 font-normal">{cert.issued}</span>
        </div>

        {cert.description && (
          <p className="text-[var(--text)]/85 text-xs sm:text-sm leading-relaxed mb-4">
            {cert.description}
          </p>
        )}

        {/* Skills Tagged */}
        {cert.skills && cert.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {cert.skills.map((skill, sIdx) => (
              <motion.span
                key={sIdx}
                whileHover={{ scale: 1.05 }}
                className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-[var(--bg)]/80 border border-[var(--text)]/10 text-[var(--text)]"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Credential ID and LinkedIn verification */}
      <div className="pt-4 border-t border-[var(--text)]/10 flex items-center justify-between mt-auto">
        {cert.credentialId ? (
          <span className="text-[11px] font-mono text-[var(--text)]/65 truncate max-w-[150px]" title={cert.credentialId}>
            ID: <strong className="text-[var(--text)]">{cert.credentialId}</strong>
          </span>
        ) : (
          <span className="text-[11px] font-mono text-[var(--text)]/65">
            Verified Credential
          </span>
        )}
        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          href={cert.link || portfolioData.personal.socials.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--text)] hover:text-[var(--highlight)] group/link shrink-0 transition-colors"
        >
          <span>Show Credential</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </motion.a>
      </div>
    </motion.div>
  );
}

const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { certifications } = portfolioData;

  const categories = ['All', ...Array.from(new Set(certifications.map((c) => c.category)))];

  const filteredCerts = certifications.filter((cert) => {
    if (activeCategory === 'All') return true;
    return cert.category === activeCategory;
  });

  return (
    <section id="certifications" className="relative py-24 md:py-32 bg-[var(--bg)]/60 text-[var(--text)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-[var(--highlight)]/06 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 text-[var(--highlight)] text-xs font-bold uppercase tracking-[0.22em] mb-3">
              <span className="w-6 h-[2px] bg-[var(--highlight)]"></span>
              Accreditations & Credentials ({certifications.length})
            </div>
            <h2 className="text-3xl sm:text-5xl font-['Barlow_Condensed',sans-serif] font-bold text-[var(--text)] uppercase tracking-tight leading-tight">
              Licenses & Certifications.
            </h2>
            <p className="mt-3 text-[var(--text)]/70 text-base leading-relaxed">
              Official certifications from Google Cloud, Infosys Oracle Practice, IIT Bombay, Unstop, IIM Bangalore, and national business case conclaves.
            </p>
          </motion.div>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => {
              const count = cat === 'All' ? certifications.length : certifications.filter(c => c.category === cat).length;
              return (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === cat
                      ? 'bg-[var(--text)] text-[var(--bg)] shadow-sm'
                      : 'bg-[var(--bg)] text-[var(--text)]/70 hover:text-[var(--text)] hover:bg-[var(--text)]/[0.05] border border-[var(--text)]/12'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    activeCategory === cat ? 'bg-[var(--bg)]/20 text-[var(--bg)]' : 'bg-[var(--text)]/08 text-[var(--text)]/70'
                  }`}>
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Certifications Grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => (
              <CertTiltCard key={cert.id} cert={cert} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
