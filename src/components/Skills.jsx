import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { categories, items } = portfolioData.skills;

  const filteredSkills = items.filter((skill) => {
    const matchesCategory =
      selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="relative py-24 md:py-32 bg-[var(--bg)] text-[var(--text)] overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[var(--highlight)]/05 rounded-full blur-[140px] pointer-events-none -z-10" />

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
              Tech Stack & Expertise
            </div>
            <h2 className="text-3xl sm:text-5xl font-['Barlow_Condensed',sans-serif] font-bold text-[var(--text)] uppercase tracking-tight leading-tight">
              Tools and technologies I use to build modern solutions.
            </h2>
            <p className="mt-3 text-[var(--text)]/70 text-base leading-relaxed">
              Enterprise financial platforms, statistical AI models, cloud data pipelines, and developer frameworks.
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative w-full md:w-72"
          >
            <Search className="w-4 h-4 text-[var(--text)]/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--bg)]/80 border border-[var(--text)]/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[var(--text)] placeholder-[var(--text)]/50 focus:outline-none focus:border-[var(--highlight)] focus:bg-[var(--bg)] transition-colors"
            />
          </motion.div>
        </div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-[var(--text)] text-[var(--bg)] shadow-sm'
                  : 'bg-[var(--bg)] text-[var(--text)]/70 hover:text-[var(--text)] hover:bg-[var(--text)]/[0.05] border border-[var(--text)]/12'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Cards Grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: index * 0.02 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-2xl border border-[var(--text)]/12 bg-[var(--bg)]/60 p-4 shadow-sm hover:border-[var(--highlight)]/50 hover:shadow-md transition-colors group flex flex-col justify-between cursor-default"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--bg)] border border-[var(--text)]/10 text-[var(--text)]/70">
                    {skill.category}
                  </span>
                  <span className="text-[11px] font-bold text-[var(--highlight)] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {skill.level}
                  </span>
                </div>
                <h3 className="font-['Barlow_Condensed',sans-serif] font-bold text-base text-[var(--text)] group-hover:text-[var(--highlight)] transition-colors uppercase tracking-wide">
                  {skill.name}
                </h3>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-[var(--text)]/60 text-sm"
          >
            No skills found matching "<span className="text-[var(--text)] font-semibold">{searchQuery}</span>". Try another search keyword.
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;
