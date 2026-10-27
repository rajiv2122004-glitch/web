import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LinkedInIcon, YouTubeIcon, WhatsAppIcon } from './SocialIcons';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#04060d] border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900/80">
          
          {/* Identity & Subtitle */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white tracking-tight">
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-cyan-400 font-mono text-[11px]">
                AI Research & Marketing Specialist
              </span>
            </div>
            <p className="mt-1 text-slate-400 text-xs max-w-md">
              Bridging empirical AI research, generative engine optimization, and search visibility.
            </p>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-5 text-slate-400">
            <a
              href={PORTFOLIO_DATA.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Rajiv Kumar H N LinkedIn profile"
              className="hover:text-[#0A66C2] transition-colors p-1"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>

            <a
              href={PORTFOLIO_DATA.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Rajiv Kumar H N YouTube channel"
              className="hover:text-[#FF0000] transition-colors p-1"
            >
              <YouTubeIcon className="w-5 h-5" />
            </a>

            <a
              href={PORTFOLIO_DATA.socials.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Rajiv Kumar H N on WhatsApp"
              className="hover:text-[#25D366] transition-colors p-1"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors text-xs"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>SEO · GEO · AEO</span>
            <span>·</span>
            <span>AI Index Survey Initiative</span>
            <span>·</span>
            <span>Bangalore, IN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
