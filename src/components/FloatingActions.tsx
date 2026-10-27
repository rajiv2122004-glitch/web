import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { WhatsAppIcon } from './SocialIcons';
import { ArrowUp } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="p-2.5 rounded-full bg-[#0a1020]/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 shadow-lg backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating WhatsApp Quick Connect Button */}
      <a
        href={PORTFOLIO_DATA.socials.whatsapp.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct message Rajiv Kumar H N on WhatsApp"
        className="group flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold text-xs shadow-xl shadow-emerald-950/40 transition-all duration-200 hover:scale-103"
      >
        <WhatsAppIcon className="w-5 h-5 text-slate-950" />
        <span className="hidden sm:inline font-semibold tracking-wide">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};
