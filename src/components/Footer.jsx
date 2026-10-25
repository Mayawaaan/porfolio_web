import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Code2 } from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

const Footer = () => {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const initials = (personal.name || "AM")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <footer className="border-t border-[var(--text)] bg-[var(--text)] text-[var(--bg)] py-14 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--highlight)]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-[var(--bg)]/10">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              className="w-10 h-10 rounded-xl bg-[var(--highlight)] text-[var(--bg)] flex items-center justify-center font-['Barlow_Condensed',sans-serif] text-base font-bold tracking-wider shadow-sm cursor-default"
            >
              {initials}
            </motion.div>
            <div>
              <span className="font-['Barlow_Condensed',sans-serif] font-bold text-lg text-[var(--bg)] uppercase tracking-wide block leading-tight">
                {personal.name}
              </span>
              <p className="text-xs text-[var(--bg)]/70 uppercase tracking-wider">
                {personal.currentCompany} • {personal.currentRole}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-['Barlow_Condensed',sans-serif] text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--bg)]/75">
            {['About', 'Ventures', 'Experience', 'Projects', 'Skills', 'Certifications', 'Awards', 'Contact'].map((item) => (
              <motion.a
                key={item}
                whileHover={{ y: -2, color: 'var(--highlight)' }}
                href={`#${item.toLowerCase()}`}
                className="transition-colors"
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              whileHover={{ y: -2 }}
              href={personal.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--highlight)] hover:text-[var(--bg)] inline-flex items-center gap-1.5 transition-colors"
            >
              <LinkedinIcon size={14} className="text-[var(--highlight)]" />
              LinkedIn
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href={personal.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--bg)]/80 hover:text-[var(--highlight)] inline-flex items-center gap-1.5 transition-colors"
            >
              <InstagramIcon size={14} />
              Instagram
            </motion.a>
          </div>

          {/* Back to top button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            id="footer-back-to-top"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg)]/10 hover:bg-[var(--highlight)] border border-[var(--bg)]/15 text-xs font-bold uppercase tracking-wider text-[var(--bg)] transition-all cursor-pointer shadow-sm"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[var(--bg)]" />
          </motion.button>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--bg)]/65">
          <p>© {new Date().getFullYear()} {personal.name}. All rights reserved.</p>

          <div className="flex items-center gap-1.5 flex-wrap justify-center text-center">
            <span>Developed & designed by</span>
            <a
              href="https://github.com/Mayawaaan/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[var(--bg)] hover:text-[var(--highlight)] transition-colors underline underline-offset-4 decoration-[var(--highlight)]/60"
            >
              Mayawaaan
            </a>
            <span className="opacity-40">•</span>
            <span>Powered by</span>
            <a
              href="https://zsyio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[var(--bg)] hover:text-[var(--highlight)] transition-colors underline underline-offset-4 decoration-[var(--highlight)]/60"
            >
              zsyio
            </a>
          </div>

          <p className="flex items-center gap-1 text-center md:text-right text-[var(--bg)]/50">
            Accenture Strategy & Consulting (GenAI) • Ex-Infosys Senior Systems Engineer • Great Lakes PGPM
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
