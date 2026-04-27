import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/layout/Navigation';
import Hero from './components/sections/Hero';
import OurDay from './components/sections/OurDay';
import Schedule from './components/sections/Schedule';
import Details from './components/sections/Details';
import RSVP from './components/sections/RSVP';
import Footer from './components/sections/Footer';

import GateIntro from './components/intro/GateIntro';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (!introDone) return;

    const lenis = new Lenis({ lerp: 0.07, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    window.scrollTo(0, 0);
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
    };
  }, [introDone]);

  return (
    <>
      {!introDone && <GateIntro onComplete={() => setIntroDone(true)} />}

      <Navigation />

      <main>
        <Hero />
        <OurDay />
        <Schedule />
        <Details />
        <RSVP />
        <Footer />
      </main>
    </>
  );
}

export default App;
