import React, { useEffect } from 'react'
import './Waves.css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

function Waves() {
  useEffect(() => {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP Animations
    gsap.from(".floating", {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out"
    });
  }, []);

  return (
    <>
      {/* <!-- Hero Section --> */}
      <section className="pt-24 pb-12 relative overflow-hidden" style={{ background: 'none' }}>
        <div className="absolute inset-0 wave-bg opacity-30"></div>
      </section>
    </>
  )
}

export default Waves