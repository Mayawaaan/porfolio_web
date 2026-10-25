import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

function ProjectTiltCard({ project, index }) {
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
      }}
      className="rounded-3xl border border-[var(--text)]/12 bg-[var(--bg)] shadow-sm hover:shadow-2xl hover:border-[var(--highlight)]/50 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
    >
      {/* Card Header Simulation */}
      <div className="bg-[var(--bg)]/70 border-b border-[var(--text)]/10 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--highlight)]/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--highlight)]/50"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--text)]/40"></span>
          <span className="ml-2 text-xs font-mono text-[var(--text)]/65 truncate max-w-[180px]">
            {project.title.toLowerCase().replace(/\s+/g, '-')}.sys
          </span>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--highlight)]/10 text-[var(--highlight)] border border-[var(--highlight)]/20">
          {project.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] mb-3 font-['Barlow_Condensed',sans-serif] uppercase tracking-wide group-hover:text-[var(--highlight)] transition-colors">
            {project.title}
          </h3>

          <p className="text-[var(--text)]/85 text-sm leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Highlights */}
          {project.highlights && (
            <div className="mb-6 space-y-2 bg-[var(--bg)]/40 p-4 rounded-2xl border border-[var(--text)]/08">
              {project.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text)]/90">
                  <CheckCircle className="w-3.5 h-3.5 text-[var(--highlight)] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Tech & Action Links */}
        <div className="pt-5 border-t border-[var(--text)]/10 mt-auto">
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.06, y: -2 }}
                transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[var(--bg)]/80 border border-[var(--text)]/10 text-[var(--text)] cursor-default"
              >
                {t}
              </motion.span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--text)]/65 hover:text-[var(--highlight)] transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-[var(--highlight)]" />
              <span>View on LinkedIn</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--text)] hover:text-[var(--highlight)] group/link transition-colors"
            >
              <span>Architecture Details</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const { projects } = portfolioData;

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = projects.filter((project) => {
    if (filter === 'All') return true;
    return project.category === filter;
  });

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-[var(--bg)]/60 text-[var(--text)] overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[var(--highlight)]/06 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[var(--highlight)]/04 rounded-full blur-[140px] pointer-events-none -z-10" />

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
              Portfolio Work
            </div>
            <h2 className="text-3xl sm:text-5xl font-['Barlow_Condensed',sans-serif] font-bold text-[var(--text)] uppercase tracking-tight leading-tight">
              Selected projects engineered for real impact.
            </h2>
            <p className="mt-3 text-[var(--text)]/70 text-base leading-relaxed">
              Enterprise financial architectures, GenAI customer pipelines, and full-stack software built for scale.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  filter === cat
                    ? 'bg-[var(--text)] text-[var(--bg)] shadow-sm'
                    : 'bg-[var(--bg)] text-[var(--text)]/70 hover:text-[var(--text)] hover:bg-[var(--text)]/[0.05] border border-[var(--text)]/12'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectTiltCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
