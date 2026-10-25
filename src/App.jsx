import React, { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#EAEBED] text-[#0B1926] selection:bg-[#006989]/25 selection:text-[#0B1926]">
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
};

export default App;