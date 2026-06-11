import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/home/Hero';
import EnterExperience from '../components/home/EnterExperience';
import HostNations from '../components/home/HostNations';
import Timeline from '../components/home/Timeline';
import Contenders from '../components/home/Contenders';

// Sections
import MatchHub from './MatchHub';
import StandingsSection from '../components/home/StandingsSection';
import Bracket from './Bracket';
import TeamsHub from './TeamsHub';
import FanZoneHub from './FanZoneHub';

import OnboardingTour from '../components/common/OnboardingTour';
import PwaPrompt from '../components/common/PwaPrompt';

export default function Home() {
  const [hasEntered, setHasEntered] = useState(() => {
    return sessionStorage.getItem('hasEnteredExperience') === 'true';
  });

  const [showTutorial, setShowTutorial] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
    sessionStorage.setItem('hasEnteredExperience', 'true');
    
    // Show tutorial on first entry if they haven't seen it
    if (localStorage.getItem('hasSeenTutorial') !== 'true') {
      // Small delay for smooth transition
      setTimeout(() => setShowTutorial(true), 1000);
    }
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('hasSeenTutorial', 'true');
    // Dispatch event so PwaPrompt can re-evaluate
    window.dispatchEvent(new Event('tutorialCompleted'));
  };

  const location = useLocation();

  useEffect(() => {
    if (hasEntered && location.hash) {
      // Small timeout to ensure DOM is fully rendered after transition
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hasEntered, location]);

  return (
    <>
      {!hasEntered && <EnterExperience onEnter={handleEnter} />}
      <div className={!hasEntered ? 'h-screen overflow-hidden pointer-events-none' : ''}>
        <Hero />
        <HostNations />
        
        {/* Single Page Scroll Sections */}
        <MatchHub />
        <Contenders />
        <StandingsSection />
        <Bracket />
        <TeamsHub />
        <FanZoneHub />
        
        {/* Legacy / History Section */}
        <section id="legacy" className="scroll-mt-20 md:scroll-mt-28">
          <Timeline />
        </section>
      </div>

      <OnboardingTour isVisible={showTutorial} onClose={handleCloseTutorial} />
      <PwaPrompt />
    </>
  );
}
