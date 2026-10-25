import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue
} from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Building,
  Sparkles,
  Trophy,
  Users,
  Award,
  ExternalLink,
  ArrowRight,
  Heart,
  ShieldCheck,
  Star,
  Globe,
  Compass
} from 'lucide-react';
import { LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

/* -------------------------------------------------------
   3D TILT CARD MICRO-COMPONENT (SPRING PHYSICS)
------------------------------------------------------- */
function TiltCard({ children, className = '', ...props }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), {
    stiffness: 240,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), {
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const Experience = () => {
  const {
    enterpriseExperience = [],
    academicLeadership = [],
    additionalExperience = [],
    education = [],
    currentPosition = {},
    volunteering = []
  } = portfolioData;

  // Scroll Progress tracker for the Enterprise Timeline
  const enterpriseTimelineRef = useRef(null);
  const { scrollYProgress: enterpriseScroll } = useScroll({
    target: enterpriseTimelineRef,
    offset: ['start 75%', 'end 70%'],
  });
  const enterpriseLineScaleY = useSpring(enterpriseScroll, {
    stiffness: 160,
    damping: 24,
    restDelta: 0.001,
  });

  // Scroll Progress tracker for Education Timeline
  const educationTimelineRef = useRef(null);
  const { scrollYProgress: educationScroll } = useScroll({
    target: educationTimelineRef,
    offset: ['start 75%', 'end 70%'],
  });
  const educationLineScaleY = useSpring(educationScroll, {
    stiffness: 160,
    damping: 24,
    restDelta: 0.001,
  });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        delay: custom * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section id="experience" className="relative py-24 md:py-32 bg-[var(--bg)] text-[var(--text)] overflow-hidden">
      {/* Background ambient architectural accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--highlight)]/06 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[var(--highlight)]/04 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* ========================================================
            SECTION HEADER (ANIMATED REVEAL)
           ======================================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 text-[var(--highlight)] text-xs font-bold uppercase tracking-[0.22em] mb-3">
            <span className="w-6 h-[2px] bg-[var(--highlight)]"></span>
            Career Journey & Track Record
            <span className="w-6 h-[2px] bg-[var(--highlight)]"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-['Barlow_Condensed',sans-serif] font-bold text-[var(--text)] uppercase tracking-tight leading-tight">
            Work Experience & Leadership.
          </h2>
          <p className="mt-3 text-[var(--text)]/70 text-base leading-relaxed">
            From tier-1 consulting at Accenture GenAI and 4+ years of Oracle Cloud Financial engineering at Infosys to institutional governance at Great Lakes and a nationwide student ambassador network.
          </p>
        </motion.div>

        {/* ========================================================
            CURRENT ROLE SPOTLIGHT CARD (TILT & PULSE)
           ======================================================== */}
        {currentPosition && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <TiltCard className="relative overflow-hidden rounded-3xl p-7 sm:p-9 bg-[var(--text)] text-[var(--bg)] border border-[var(--text)] shadow-2xl group">
              {/* Dynamic ambient studio aura */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--highlight)]/20 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-0 left-10 w-72 h-72 bg-[var(--highlight)]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                {/* Telemetry Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-5 border-b border-[var(--bg)]/10">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--highlight)]/20 border border-[var(--highlight)]/40 text-[var(--bg)] text-xs font-bold tracking-wider uppercase">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--highlight)] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--highlight)]"></span>
                    </span>
                    <span>Active Enterprise Position</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[var(--bg)]/75">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[var(--highlight)]" />
                      {currentPosition.period}
                    </span>
                    <span>•</span>
                    <span className="text-[var(--highlight)] font-bold">{currentPosition.type}</span>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8">
                    <h3 className="text-2xl sm:text-4xl font-bold font-['Barlow_Condensed',sans-serif] uppercase tracking-tight text-[var(--bg)] mb-2">
                      {currentPosition.role}
                    </h3>

                    <div className="text-base font-bold text-[var(--highlight)] mb-2 flex items-center gap-2 flex-wrap">
                      <Building className="w-4 h-4 shrink-0" />
                      <span className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wide text-lg text-[var(--bg)]">
                        {currentPosition.company}
                      </span>
                      <span className="text-[var(--bg)]/60">•</span>
                      <span className="text-[var(--highlight)] font-semibold text-sm">
                        {currentPosition.division}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[var(--bg)]/70 mb-5">
                      <MapPin className="w-3.5 h-3.5 text-[var(--highlight)]" />
                      <span>{currentPosition.location}</span>
                    </div>

                    <p className="text-[var(--bg)]/90 text-sm sm:text-base leading-relaxed mb-6">
                      {currentPosition.summary}
                    </p>

                    {/* Interactive Skills Grid */}
                    <div className="flex flex-wrap gap-2">
                      {currentPosition.toolsAndSkills.map((tool, idx) => (
                        <motion.span
                          key={idx}
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                          className="text-xs font-semibold px-3 py-1 rounded-lg bg-[var(--bg)]/10 border border-[var(--bg)]/15 text-[var(--bg)] hover:border-[var(--highlight)]/60 cursor-default"
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end">
                    <div className="p-5 rounded-2xl bg-[var(--bg)]/[0.08] border border-[var(--bg)]/10 w-full mb-5">
                      <span className="text-xs uppercase tracking-wider text-[var(--highlight)] font-bold block mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Core Focus Pillar
                      </span>
                      <p className="text-xs text-[var(--bg)]/85 leading-relaxed">
                        Marketing analytics & customer journey optimization powered by <strong>Adobe Mix Modeler</strong>, econometric attribution, and enterprise <strong>Generative AI</strong>.
                      </p>
                    </div>
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      href={portfolioData.personal.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--highlight)] hover:opacity-90 text-[var(--bg)] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md group/btn"
                    >
                      <LinkedinIcon size={15} />
                      <span>Verify Role on LinkedIn</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        )}

        {/* ========================================================
            OVERVIEW METRICS BANNER (INTERACTIVE HOVER LIFT)
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6 rounded-3xl bg-[var(--bg)]/70 border border-[var(--text)]/10 mb-16 shadow-sm"
        >
          {[
            { val: "4.5+ YEARS", label: "Enterprise Engineering", highlight: false },
            { val: "MVP ORACLE", label: "Practice Townhall Award", highlight: true },
            { val: "DUAL MBA", label: "Finance & Data Science", highlight: false },
            { val: "2.8+ YEARS", label: "Robin Hood Army Service", highlight: true }
          ].map((stat, sIdx) => (
            <motion.div
              key={sIdx}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-2 cursor-default"
            >
              <div className={`text-2xl sm:text-3xl font-bold font-['Barlow_Condensed',sans-serif] ${
                stat.highlight ? 'text-[var(--highlight)]' : 'text-[var(--text)]'
              }`}>
                {stat.val}
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text)]/65 mt-0.5">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ========================================================
            SUB-SECTION 1: ENTERPRISE & MANAGEMENT CONSULTING
            (DYNAMIC SCROLL-LINKED TIMELINE PROGRESS LINE)
           ======================================================== */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--highlight)]/10 border border-[var(--highlight)]/20 text-[var(--highlight)] flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--highlight)]">
                Professional History
              </div>
              <h3 className="font-['Barlow_Condensed',sans-serif] text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[var(--text)]">
                Enterprise & Management Consulting
              </h3>
            </div>
          </motion.div>

          {/* Dynamic Scroll Timeline Track */}
          <div ref={enterpriseTimelineRef} className="relative pl-6 sm:pl-10 space-y-12">
            {/* Static Background Guideline */}
            <div className="absolute left-[7px] sm:left-[9px] top-4 bottom-4 w-[2px] bg-[var(--text)]/15 rounded-full" />
            {/* Scroll-Driven Glowing Highlight Fill Line */}
            <motion.div
              style={{ scaleY: enterpriseLineScaleY, transformOrigin: 'top' }}
              className="absolute left-[7px] sm:left-[9px] top-4 bottom-4 w-[2.5px] bg-gradient-to-b from-[var(--highlight)] via-[var(--highlight)] to-[var(--highlight)] rounded-full shadow-[0_0_12px_rgba(0,105,137,0.55)]"
            />

            {enterpriseExperience.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative group"
              >
                {/* Timeline Interactive Node Dot */}
                <motion.div
                  whileHover={{ scale: 1.25 }}
                  className={`absolute -left-[30px] sm:-left-[38px] top-2.5 w-4 h-4 rounded-full border-2 ${
                    item.isCurrent
                      ? 'bg-[var(--highlight)] border-[var(--bg)] ring-4 ring-[var(--highlight)]/25'
                      : 'bg-[var(--bg)] border-[var(--highlight)]'
                  } shadow-sm z-10 transition-transform`}
                />

                <TiltCard className="p-6 sm:p-8 rounded-3xl border border-[var(--text)]/12 bg-[var(--bg)]/60 shadow-sm hover:shadow-xl hover:border-[var(--highlight)]/50 transition-all duration-300">
                  {/* Top Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="text-xl sm:text-2xl font-bold text-[var(--text)] font-['Barlow_Condensed',sans-serif] uppercase tracking-wide group-hover:text-[var(--highlight)] transition-colors">
                        {item.role}
                      </h4>
                      {item.isCurrent ? (
                        <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-bold bg-[var(--highlight)] text-[var(--bg)] uppercase tracking-wider">
                          Active Current Job
                        </span>
                      ) : (
                        item.badge && (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--highlight)]/10 text-[var(--highlight)] border border-[var(--highlight)]/20 uppercase tracking-wider">
                            {item.badge}
                          </span>
                        )
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[var(--bg)] text-[var(--text)]/70 border border-[var(--text)]/10 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-[var(--highlight)]" />
                      {item.period}
                    </div>
                  </div>

                  {/* Company & Location */}
                  <div className="flex items-center gap-4 text-xs font-medium text-[var(--text)]/70 mb-4">
                    <span className="text-[var(--highlight)] font-bold text-base tracking-wide flex items-center gap-1.5 font-['Barlow_Condensed',sans-serif] uppercase">
                      <Building className="w-4 h-4 shrink-0" />
                      {item.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[var(--highlight)]" />
                      {item.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[var(--text)]/85 text-sm sm:text-base leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Deliverables & Highlights */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="mb-6 space-y-2.5 bg-[var(--bg)] p-5 rounded-2xl border border-[var(--text)]/10">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--highlight)] block mb-1 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Key Execution Highlights:
                      </span>
                      {item.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text)]/90">
                          <CheckCircle2 className="w-4 h-4 text-[var(--highlight)] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{hl}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Interactive Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, sIdx) => (
                      <motion.span
                        key={sIdx}
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="text-xs px-2.5 py-1 rounded-md bg-[var(--bg)] border border-[var(--text)]/10 text-[var(--text)] font-semibold hover:border-[var(--highlight)]/40 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================
            SUB-SECTION 2: INSTITUTIONAL GOVERNANCE & LEADERSHIP
           ======================================================== */}
        <div className="mb-20 pt-12 border-t border-[var(--text)]/10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--highlight)]/10 border border-[var(--highlight)]/20 text-[var(--highlight)] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--highlight)]">
                Executive Governance
              </div>
              <h3 className="font-['Barlow_Condensed',sans-serif] text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[var(--text)]">
                Campus & Institutional Leadership
              </h3>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {academicLeadership.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="p-7 sm:p-8 rounded-3xl border border-[var(--text)]/12 bg-[var(--bg)]/60 shadow-sm hover:shadow-xl hover:border-[var(--highlight)]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[var(--highlight)]/10 text-[var(--highlight)] border border-[var(--highlight)]/20 uppercase tracking-wider">
                      {item.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[var(--bg)] text-[var(--text)]/70 border border-[var(--text)]/10 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-[var(--highlight)]" />
                      {item.period}
                    </div>
                  </div>

                  <h4 className="text-2xl font-bold text-[var(--text)] font-['Barlow_Condensed',sans-serif] uppercase tracking-wide group-hover:text-[var(--highlight)] transition-colors mb-2">
                    {item.role}
                  </h4>

                  <div className="text-sm font-bold text-[var(--highlight)] mb-4 flex items-center gap-2">
                    <Building className="w-4 h-4 shrink-0" />
                    <span>{item.organization}</span>
                  </div>

                  <p className="text-[var(--text)]/85 text-sm sm:text-base leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--text)]/10 mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs px-2.5 py-1 rounded-md bg-[var(--bg)] border border-[var(--text)]/10 text-[var(--text)] font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================
            SUB-SECTION 3: EDUCATION & GLOBAL PEDIGREE (TIMELINE)
           ======================================================== */}
        <div className="mb-20 pt-12 border-t border-[var(--text)]/10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--highlight)]/10 border border-[var(--highlight)]/20 text-[var(--highlight)] flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--highlight)]">
                Academic Pedigree
              </div>
              <h3 className="font-['Barlow_Condensed',sans-serif] text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[var(--text)]">
                Education & Global Immersion
              </h3>
            </div>
          </motion.div>

          <div ref={educationTimelineRef} className="relative pl-6 sm:pl-10 space-y-10">
            {/* Background Guideline */}
            <div className="absolute left-[7px] sm:left-[9px] top-4 bottom-4 w-[2px] bg-[var(--text)]/15 rounded-full" />
            {/* Scroll-Driven Glowing Highlight Fill Line */}
            <motion.div
              style={{ scaleY: educationLineScaleY, transformOrigin: 'top' }}
              className="absolute left-[7px] sm:left-[9px] top-4 bottom-4 w-[2.5px] bg-gradient-to-b from-[var(--highlight)] via-[var(--highlight)] to-[var(--highlight)] rounded-full shadow-[0_0_12px_rgba(0,105,137,0.55)]"
            />

            {education.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.65, delay: idx * 0.1 }}
                className="relative group"
              >
                <div className="absolute -left-[30px] sm:-left-[38px] top-2.5 w-4 h-4 rounded-full bg-[var(--bg)] border-2 border-[var(--highlight)] group-hover:scale-125 transition-transform z-10" />

                <div className="p-6 sm:p-8 rounded-3xl border border-[var(--text)]/12 bg-[var(--bg)]/60 shadow-sm hover:shadow-xl hover:border-[var(--highlight)]/40 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="text-xl sm:text-2xl font-bold text-[var(--text)] font-['Barlow_Condensed',sans-serif] uppercase tracking-wide group-hover:text-[var(--highlight)] transition-colors">
                        {item.degree}
                      </h4>
                      {item.badge && (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--highlight)]/10 text-[var(--highlight)] border border-[var(--highlight)]/20 uppercase tracking-wider">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[var(--bg)] text-[var(--text)]/70 border border-[var(--text)]/10 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-[var(--highlight)]" />
                      {item.period}
                    </div>
                  </div>

                  <div className="text-[var(--highlight)] text-base font-bold mb-2 font-['Barlow_Condensed',sans-serif] uppercase tracking-wide flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 shrink-0" />
                    <span>{item.institution}</span>
                  </div>

                  <div className="text-xs text-[var(--text)]/70 font-medium mb-4">
                    Distinction / Standing: <strong className="text-[var(--text)] font-bold">{item.grade}</strong>
                  </div>

                  <p className="text-[var(--text)]/85 text-sm sm:text-base leading-relaxed bg-[var(--bg)] p-4 rounded-2xl border border-[var(--text)]/10 mb-4">
                    {item.details}
                  </p>

                  {/* Competitions & Honors List */}
                  {item.competitionsAndHonors && item.competitionsAndHonors.length > 0 && (
                    <div className="pt-4 border-t border-[var(--text)]/10">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--highlight)] block mb-2.5 flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 text-[var(--highlight)]" />
                        Key Distinctions, Competitions & Leadership ({item.competitionsAndHonors.length}):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.competitionsAndHonors.map((comp, cIdx) => (
                          <motion.div
                            key={cIdx}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-start gap-2 text-xs text-[var(--text)] bg-[var(--bg)] p-2.5 rounded-xl border border-[var(--text)]/10 hover:border-[var(--highlight)]/30 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--highlight)] shrink-0 mt-0.5" />
                            <span className="leading-tight font-medium">{comp}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================
            SUB-SECTION 4: SOCIAL IMPACT & CIVIC SERVICE
           ======================================================== */}
        <div className="mb-20 pt-12 border-t border-[var(--text)]/10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--highlight)]/10 border border-[var(--highlight)]/20 text-[var(--highlight)] flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--highlight)]">
                Community Stewardship
              </div>
              <h3 className="font-['Barlow_Condensed',sans-serif] text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[var(--text)]">
                Volunteering & Social Impact
              </h3>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {volunteering && volunteering.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="p-7 sm:p-8 rounded-3xl border border-[var(--text)]/12 bg-[var(--bg)]/60 shadow-sm hover:shadow-xl hover:border-[var(--highlight)]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--highlight)]/10 text-[var(--highlight)] border border-[var(--highlight)]/20 uppercase tracking-wider">
                      <Heart className="w-3.5 h-3.5 fill-[var(--highlight)]/20 text-[var(--highlight)]" />
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono text-[var(--text)]/65">
                      {item.period}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold text-[var(--text)] font-['Barlow_Condensed',sans-serif] uppercase tracking-wide group-hover:text-[var(--highlight)] transition-colors mb-1">
                    {item.role}
                  </h4>
                  <div className="text-sm font-bold text-[var(--highlight)] mb-3 flex items-center gap-2">
                    <Building className="w-4 h-4 shrink-0" />
                    <span>{item.organization}</span>
                  </div>

                  <p className="text-[var(--text)]/85 text-sm sm:text-base leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--text)]/10 flex flex-wrap gap-1.5 mt-auto">
                  {item.skills && item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[var(--bg)] border border-[var(--text)]/10 text-[var(--text)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================
            SUB-SECTION 5: GROWTH & AMBASSADOR NETWORK
           ======================================================== */}
        <div className="pt-12 border-t border-[var(--text)]/10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--highlight)]/10 border border-[var(--highlight)]/20 text-[var(--highlight)] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--highlight)]">
                Nationwide Outreach
              </div>
              <h3 className="font-['Barlow_Condensed',sans-serif] text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[var(--text)]">
                Growth, Startups & Ambassador Network
              </h3>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {additionalExperience.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-5 rounded-2xl border border-[var(--text)]/12 bg-[var(--bg)]/60 shadow-sm hover:shadow-md hover:border-[var(--highlight)]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--bg)] text-[var(--highlight)] border border-[var(--text)]/10 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text)]/65">
                      {item.period}
                    </span>
                  </div>

                  <h5 className="text-base font-bold text-[var(--text)] font-['Barlow_Condensed',sans-serif] uppercase tracking-wide mb-1 group-hover:text-[var(--highlight)] transition-colors">
                    {item.role}
                  </h5>
                  <div className="text-xs font-bold text-[var(--highlight)] mb-2">
                    {item.company}
                  </div>
                  <p className="text-xs text-[var(--text)]/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================
            LINKEDIN CROSS-VERIFICATION CALLOUT (MAGNETIC HOVER)
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href={portfolioData.personal.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[var(--bg)] hover:bg-[var(--text)] hover:text-[var(--bg)] border border-[var(--text)]/12 text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--text)] transition-all duration-300 shadow-sm group"
          >
            <LinkedinIcon size={16} className="text-[var(--highlight)] group-hover:text-[var(--bg)] transition-colors" />
            <span>Complete verified career timeline & peer endorsements on LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5 text-[var(--highlight)] group-hover:text-[var(--bg)] group-hover:translate-x-0.5 transition-all" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
