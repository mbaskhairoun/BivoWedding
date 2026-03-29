import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Section components
import Navigation from './components/layout/Navigation';
import Hero from './components/sections/Hero';
import OurStory from './components/sections/OurStory';
import Countdown from './components/sections/Countdown';
import Celebration from './components/sections/Celebration';
import Gallery from './components/sections/Gallery';
import RSVP from './components/sections/RSVP';
import TravelStay from './components/sections/TravelStay';
import Registry from './components/sections/Registry';
import Footer from './components/sections/Footer';

// Effects
import PetalParticles from './components/effects/PetalParticles';
import CursorTrail from './components/effects/CursorTrail';

// Layout
import WashDivider from './components/layout/WashDivider';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.07, smoothWheel: true });

    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
    };
  }, []);

  return (
    <>
      <Navigation />

      <main>
        <Hero />
        <WashDivider variant={1} />
        <OurStory />
        <WashDivider variant={2} />
        <Countdown />
        <WashDivider variant={3} />
        <Celebration />
        <WashDivider variant={4} />
        <Gallery />
        <WashDivider variant={5} />
        <RSVP />
        <WashDivider variant={1} />
        <TravelStay />
        <WashDivider variant={2} />
        <Registry />
        <Footer />
      </main>

      <PetalParticles />
      <CursorTrail />
    </>
  );
}

export default App;
