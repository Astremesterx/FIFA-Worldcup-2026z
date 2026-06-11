import { useState } from 'react';
import PenaltyShootout from '../components/fanzone/PenaltyShootout';
import Trivia from '../components/fanzone/Trivia';

type Tab = 'Shootout' | 'Trivia';

export default function FanZoneHub() {
  const [activeTab, setActiveTab] = useState<Tab>('Shootout');

  const getTabClass = (tab: Tab) => {
    return `font-label-caps text-label-caps px-6 py-3 rounded-full transition-all uppercase whitespace-nowrap ${
      activeTab === tab 
      ? 'bg-secondary text-on-secondary shadow-[0_0_15px_rgba(233,195,73,0.4)]' 
      : 'bg-surface/40 backdrop-blur-xl border border-white/10 text-on-surface hover:text-secondary hover:border-secondary'
    }`;
  };

  return (
    <section id="fanzone" className="flex-grow flex flex-col items-center py-10 md:py-20 px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto min-h-[80vh]">
      {/* Header Section */}
      <div className="mb-12 text-center relative z-10">
        <h1 className="font-display-hero text-5xl md:text-display-hero text-secondary mb-4 shadow-glow">FAN ZONE</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          The pinnacle of fan engagement. Compete globally across predictions, trivia, and games to claim your spot in World Cup history.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-start md:justify-center w-full gap-4 mb-16 overflow-x-auto pb-4 scrollbar-hide px-4">

        <button className={getTabClass('Shootout')} onClick={() => setActiveTab('Shootout')}>
          PENALTY SHOOTOUT
        </button>
        <button className={getTabClass('Trivia')} onClick={() => setActiveTab('Trivia')}>
          WC TRIVIA
        </button>
      </div>

      {/* Content Area */}
      <div className="w-full flex justify-center fade-in">
        {activeTab === 'Shootout' && <PenaltyShootout />}
        {activeTab === 'Trivia' && <Trivia />}
      </div>
    </section>
  );
}
