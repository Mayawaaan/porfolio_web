import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Layout,
  Bot,
  TrendingUp,
  Layers,
  CheckCircle2,
  UserCheck,
  MapPin,
  GraduationCap,
  Building2,
  Rocket,
  Heart,
  Sparkles
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const iconMap = {
  Bot: Bot,
  TrendingUp: TrendingUp,
  Rocket: Rocket,
  Layers: Layers
};

function FocusTiltCard({ area, index }) {
  const IconComponent = iconMap[area.iconName] || Layout;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
    stiffness: 240,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), {
    stiffness: 240,
    damping: 24,
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className="rounded-3xl border border-[var(--text)]/12 bg-[var(--bg)]/60 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-[var(--highlight)]/50 transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        <div className="w-12 h-12 rounded-2xl bg-[var(--highlight)]/10 border border-[var(--highlight)]/20 flex items-center justify-center text-[var(--highlight)] mb-5 group-hover:scale-110 group-hover:bg-[var(--highlight)]/20 transition-all duration-300">
          <IconComponent className="w-6 h-6" />
        </div>
        <h4 className="text-xl font-bold text-[var(--text)] mb-2 font-['Barlow_Condensed',sans-serif] uppercase tracking-wide group-hover:text-[var(--highlight)] transition-colors">
          {area.title}
        </h4>
        <p className="text-sm text-[var(--text)]/70 leading-relaxed">
          {area.description}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-[var(--text)]/08 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[var(--highlight)]">
        <span>Focus Area // 0{index + 1}</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
      </div>
    </motion.div>
  );
}

const About = () => {
  const { personal, focusAreas } = portfolioData;

  const keyFacts = [
    { icon: UserCheck, label: "Current", val: "Accenture GenAI Consulting" },
    { icon: Building2, label: "Ex-Infosys", val: "Senior Systems Engineer (4+ Yrs)" },
    { icon: GraduationCap, label: "Pedigree", val: "Great Lakes PGPM (Finnovation Head)" },
    { icon: Rocket, label: "Founder", val: "C Sec Hub & Captionate (5+ Yrs)" },
    { icon: Heart, label: "Social Impact", val: "Robin Hood Army (2.8+ Yrs) & Karma Yoga GLIM", colSpan: true },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 bg-[var(--bg)] text-[var(--text)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[var(--highlight)]/06 rounded-full blur-[140px] pointer-events-none -z-10" />
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
            Executive Bio & Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-['Barlow_Condensed',sans-serif] font-bold text-[var(--text)] uppercase tracking-tight leading-tight">
            Unifying autonomous AI, financial cloud architectures, and product leadership.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative and details */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <p className="text-[var(--text)]/90 text-base sm:text-lg leading-relaxed">
              {personal.bio}
            </p>

            <p className="text-[var(--text)]/70 text-base leading-relaxed">
              At Accenture Strategy & Consulting's GenAI division, I combine advanced data science, Adobe Mix Modeler, and generative models to optimize customer journeys. Previously, I spent 4+ years at Infosys as Senior Systems Engineer specializing in Oracle Cloud Financials and Python/SQL AI solutions, earning the MVP Oracle Practice award. Beyond enterprise consulting, I have founded and scaled ventures including C Sec Hub and Captionate, and actively serve the community through Robin Hood Army and Karma Yoga.
            </p>

            {/* Quick Specs / Fact List with animated hover items */}
            <div className="rounded-3xl border border-[var(--text)]/15 bg-[var(--bg)]/75 p-7 shadow-sm space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--highlight)] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Key Career Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm">
                {keyFacts.map((fact, idx) => {
                  const FactIcon = fact.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02, x: 2 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                      className={`flex items-center gap-3 p-3 rounded-xl bg-[var(--bg)]/80 border border-[var(--text)]/08 text-[var(--text)] ${
                        fact.colSpan ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <FactIcon className="w-4 h-4 text-[var(--highlight)] shrink-0" />
                      <span className="text-xs sm:text-sm">
                        <strong className="text-[var(--text)]">{fact.label}:</strong> {fact.val}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Focus Areas Cards with 3D Tilt */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {focusAreas.map((area, index) => (
              <FocusTiltCard key={index} area={area} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
