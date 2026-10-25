import React from 'react';
import Hero from './Hero';
import StatsMarquee from './StatsMarquee';
import About from './About';
import Ventures from './Ventures';
import Experience from './Experience';
import Projects from './Projects';
import Skills from './Skills';
import Certifications from './Certifications';
import Achievements from './Achievements';
import Contact from './Contact';

const LandingPage = () => {
  return (
    <main>
      <Hero />
      <StatsMarquee />
      <About />
      <Ventures />
      <Experience />
      <Projects />
      <Skills />
      <Certifications />
      <Achievements />
      <Contact />
    </main>
  );
};

export default LandingPage;