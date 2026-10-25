import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check, Send, MapPin, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

const Contact = () => {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ state: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setStatus({ state: 'sending', message: 'Sending message...' });

    // Simulate sending network request
    setTimeout(() => {
      setStatus({
        state: 'success',
        message: 'Thank you! Your message has been sent successfully. I will get back to you shortly.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus({ state: 'idle', message: '' }), 6000);
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[var(--bg)]/60 text-[var(--text)] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-[var(--highlight)]/06 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-[var(--highlight)] text-xs font-bold uppercase tracking-[0.22em] mb-3">
                <span className="w-6 h-[2px] bg-[var(--highlight)]"></span>
                Let's Connect
              </div>
              <h2 className="text-3xl sm:text-5xl font-['Barlow_Condensed',sans-serif] font-bold text-[var(--text)] uppercase tracking-tight leading-tight mb-4">
                Have an enterprise initiative or advisory inquiry?
              </h2>
              <p className="text-[var(--text)]/70 text-base leading-relaxed">
                I'm always open to discussing GenAI implementations, quantitative finance models, enterprise architecture, or startup consulting.
              </p>
            </div>

            {/* Email Copy Card */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl border border-[var(--text)]/12 bg-[var(--bg)] p-6 sm:p-7 shadow-sm"
            >
              <span className="text-xs font-bold text-[var(--highlight)] uppercase tracking-[0.22em] block mb-2">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-3 bg-[var(--bg)]/80 border border-[var(--text)]/15 rounded-xl px-4 py-3">
                <span className="text-sm font-mono text-[var(--text)] font-bold truncate">
                  akshatmagardey786@gmail.com 
                </span>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  type="button"
                  id="contact-copy-email-btn"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-[var(--text)] hover:bg-[var(--highlight)] text-[var(--bg)] transition-colors cursor-pointer shrink-0"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-[var(--bg)]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </motion.button>
              </div>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[11px] text-[var(--highlight)] font-bold mt-2 block"
                >
                  ✓ Email copied to clipboard!
                </motion.span>
              )}
            </motion.div>

            {/* Location & Response Time */}
            <div className="space-y-3.5 text-sm text-[var(--text)]/85">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[var(--highlight)] shrink-0" />
                <span>Location: <strong className="text-[var(--text)]">{personal.location}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[var(--highlight)] shrink-0" />
                <span>Typical response time: <strong className="text-[var(--text)]">Within 24 hours</strong></span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <span className="text-xs font-bold text-[var(--text)]/65 uppercase tracking-[0.22em] block mb-3">
                Verified Profiles
              </span>
              <div className="flex flex-wrap gap-2.5">
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--text)] hover:bg-[var(--highlight)] text-xs font-bold uppercase tracking-wider text-[var(--bg)] transition-all shadow-sm"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[var(--bg)]" />
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href={personal.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg)] hover:bg-[var(--highlight)] hover:text-[var(--bg)] border border-[var(--text)]/15 text-xs font-bold uppercase tracking-wider text-[var(--text)] transition-all shadow-sm"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[var(--highlight)]" />
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href={personal.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg)] hover:bg-[var(--text)] hover:text-[var(--bg)] border border-[var(--text)]/15 text-xs font-bold uppercase tracking-wider text-[var(--text)] transition-all shadow-sm"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text)]/60" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-[var(--text)]/12 bg-[var(--bg)] p-7 sm:p-9 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-[var(--highlight)]" />
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] font-['Barlow_Condensed',sans-serif] uppercase tracking-wide">
                  Send a Message
                </h3>
              </div>

              {status.state === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 mb-6 rounded-xl bg-[var(--highlight)]/10 border border-[var(--highlight)]/30 text-[var(--highlight)] font-bold text-sm flex items-start gap-2"
                >
                  <Check className="w-5 h-5 text-[var(--highlight)] shrink-0 mt-0.5" />
                  <span>{status.message}</span>
                </motion.div>
              )}

              {status.state === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 mb-6 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 text-sm font-semibold"
                >
                  {status.message}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)]/65 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[var(--bg)]/70 border border-[var(--text)]/15 rounded-xl px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--text)]/50 focus:outline-none focus:border-[var(--highlight)] focus:bg-[var(--bg)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)]/65 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[var(--bg)]/70 border border-[var(--text)]/15 rounded-xl px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--text)]/50 focus:outline-none focus:border-[var(--highlight)] focus:bg-[var(--bg)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)]/65 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Strategy & Consulting Inquiry / Collaboration"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg)]/70 border border-[var(--text)]/15 rounded-xl px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--text)]/50 focus:outline-none focus:border-[var(--highlight)] focus:bg-[var(--bg)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)]/65 mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    required
                    placeholder="Tell me about your organization, project objectives, or areas of inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg)]/70 border border-[var(--text)]/15 rounded-xl px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--text)]/50 focus:outline-none focus:border-[var(--highlight)] focus:bg-[var(--bg)] transition-colors resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  id="contact-submit-btn"
                  disabled={status.state === 'sending'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[var(--text)] hover:bg-[var(--highlight)] disabled:opacity-50 text-[var(--bg)] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer"
                >
                  {status.state === 'sending' ? (
                    'Sending...'
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
