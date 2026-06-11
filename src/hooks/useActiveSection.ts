import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[], offset: number = 200) {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      // If we are at the very top of the page, default to home
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      let currentSection = 'home';
      let minDistance = Infinity;

      // Find the section closest to the top of the viewport
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Distance from top of viewport to the section's top (adjusted by offset)
          const distanceToTop = Math.abs(rect.top - offset);

          // If the section's top is near the viewport top OR it spans across the viewport
          if (rect.top <= offset + 100 && rect.bottom >= offset) {
            currentSection = id;
            break; // This section is currently occupying our offset threshold
          } else if (distanceToTop < minDistance && rect.top > offset) {
            // fallback if we are between sections
            minDistance = distanceToTop;
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
}
