import React, { useEffect, useState, useCallback } from 'react';

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  const [bottom, setBottom] = useState(24); // distance from bottom in px

  const handleScroll = useCallback(() => {
    const y = window.scrollY || document.documentElement.scrollTop;
    setVisible(y > 300);

    // keep button above footer if footer is visible
    const footer = document.querySelector('footer');
    if (footer) {
      const rect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top < viewportHeight) {
        // footer is visible; move button up so it sits above footer
        const overlap = viewportHeight - rect.top;
        setBottom(overlap + 24);
      } else {
        setBottom(24);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // run once
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      style={{ bottom: `${bottom}px` }}
      className={`fixed right-6 z-50 inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-600 text-white shadow-lg hover:bg-sky-700 focus:outline-none transition-opacity duration-200`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
