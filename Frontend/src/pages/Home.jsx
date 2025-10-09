import React, { useEffect } from 'react';
import {
  Hero,
  TopDeals,
  WhyChoose,
  NewArrivals,
  Testimonials,
  HowItWorks
} from '../components/Home';

const Home = () => {
  useEffect(() => {
    // Add card hover animations
    const addCardHoverEffects = () => {
      document.querySelectorAll('.card-hover').forEach(card => {
        card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
        });
      });
    };

    // Add ripple effect to buttons
    const addRippleEffects = () => {
      document.querySelectorAll('.ripple-effect').forEach(button => {
        button.addEventListener('click', function(e) {
          const ripple = document.createElement('span');
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;
          
          ripple.style.width = ripple.style.height = size + 'px';
          ripple.style.left = x + 'px';
          ripple.style.top = y + 'px';
          ripple.classList.add('ripple');
          
          this.appendChild(ripple);
          
          setTimeout(() => {
            ripple.remove();
          }, 600);
        });
      });
    };

    addCardHoverEffects();
    addRippleEffects();

    // Cleanup function
    return () => {
      document.querySelectorAll('.card-hover').forEach(card => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <TopDeals />
      <WhyChoose />
      <NewArrivals />
      <Testimonials />
      <HowItWorks />
    </div>
  );
};

export default Home;
