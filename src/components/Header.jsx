import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Ventures', href: '#ventures' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Awards', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ];

  const personal = portfolioData?.personal ?? {};
  const initials = (personal.name || "AM")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = [
        'home',
        'about',
        'ventures',
        'experience',
        'projects',
        'skills',
        'certifications',
        'achievements',
        'contact',
      ];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--bg)]/92 backdrop-blur-md border-b border-[var(--text)]/12 shadow-[0_8px_30px_rgba(0,0,0,0.06)] py-3'
          : 'bg-[var(--bg)]/60 backdrop-blur-sm border-b border-[var(--text)]/06 py-4'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14 flex items-center justify-between">
        {/* Brand Logo */}
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="#home"
          className="flex items-center gap-3 group cursor-pointer"
          id="nav-logo"
        >
          <div className="w-9 h-9 rounded-lg bg-[var(--text)] group-hover:bg-[var(--highlight)] text-[var(--bg)] flex items-center justify-center font-['Barlow_Condensed',sans-serif] text-sm font-bold tracking-wider transition-colors duration-300 border border-[var(--text)]/20 shadow-sm">
            {initials}
          </div>
          <div>
            <span className="font-['Barlow_Condensed',sans-serif] text-lg font-bold uppercase tracking-tight text-[var(--text)] group-hover:text-[var(--highlight)] transition-colors block leading-tight">
              {personal.name}
            </span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--text)]/65">
              AI Architecture • GenAI
            </span>
          </div>
        </motion.a>

        {/* Desktop Navigation Links (Harmonious Floating Capsule) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[var(--bg)]/80 border border-[var(--text)]/15 rounded-full px-3 py-1 backdrop-blur-md shadow-sm">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--text)] text-[var(--bg)] shadow-sm'
                    : 'text-[var(--text)]/70 hover:text-[var(--text)] hover:bg-[var(--text)]/[0.05]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Socials + Let's Talk CTA */}
        <div className="hidden md:flex items-center gap-2.5">
          {personal.socials?.linkedin && (
            <motion.a
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.92 }}
              href={personal.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Connect on LinkedIn"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--text)]/15 bg-[var(--bg)]/60 text-[var(--text)]/75 hover:border-[var(--highlight)] hover:bg-[var(--highlight)] hover:text-[var(--bg)] transition-all duration-300"
              title="LinkedIn"
            >
              <LinkedinIcon size={15} />
            </motion.a>
          )}
          {personal.socials?.instagram && (
            <motion.a
              whileHover={{ scale: 1.1, rotate: -2 }}
              whileTap={{ scale: 0.92 }}
              href={personal.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Profile (@beatking_akshat)"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--text)]/15 bg-[var(--bg)]/60 text-[var(--text)]/75 hover:border-[var(--highlight)] hover:bg-[var(--highlight)] hover:text-[var(--bg)] transition-all duration-300"
              title="Instagram (@beatking_akshat)"
            >
              <InstagramIcon size={15} />
            </motion.a>
          )}
          <motion.a
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            href="#contact"
            id="nav-cta-contact"
            className="flex items-center gap-1.5 bg-[var(--text)] hover:bg-[var(--highlight)] text-[var(--bg)] font-bold text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md ml-1"
          >
            Let's Talk
            <ArrowUpRight size={14} />
          </motion.a>
        </div>

        {/* Mobile Hamburger Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          id="mobile-menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg border border-[var(--text)]/15 bg-[var(--bg)]/80 text-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] transition-colors focus:outline-none"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Mobile Menu Dropdown with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="lg:hidden bg-[var(--bg)]/98 border-b border-[var(--text)]/15 backdrop-blur-xl px-6 py-6 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-xs uppercase tracking-[0.18em] font-bold py-2.5 border-b border-[var(--text)]/10 transition-colors ${
                      isActive
                        ? 'text-[var(--highlight)]'
                        : 'text-[var(--text)] hover:text-[var(--highlight)]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-3 flex flex-col gap-2.5">
                {personal.socials?.linkedin && (
                  <a
                    href={personal.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 border border-[var(--text)]/15 bg-[var(--bg)]/70 text-[var(--text)] font-bold text-xs uppercase tracking-[0.16em] py-3 rounded-xl hover:bg-[var(--highlight)] hover:text-[var(--bg)] transition-colors"
                  >
                    <LinkedinIcon size={15} />
                    Connect on LinkedIn
                  </a>
                )}
                {personal.socials?.instagram && (
                  <a
                    href={personal.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 border border-[var(--text)]/15 bg-[var(--bg)]/70 text-[var(--text)] font-bold text-xs uppercase tracking-[0.16em] py-3 rounded-xl hover:bg-[var(--highlight)] hover:text-[var(--bg)] transition-colors"
                  >
                    <InstagramIcon size={15} />
                    Instagram (@beatking_akshat)
                  </a>
                )}
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[var(--text)] hover:bg-[var(--highlight)] text-[var(--bg)] font-bold text-xs uppercase tracking-[0.16em] py-3 rounded-xl transition-colors shadow-sm"
                >
                  Let's Talk
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;