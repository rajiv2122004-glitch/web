import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LinkedInIcon, YouTubeIcon, WhatsAppIcon } from './SocialIcons';
import { Menu, X, Camera } from 'lucide-react';

interface NavbarProps {
  onOpenPhotoModal: () => void;
  onOpenBackendModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPhotoModal, onOpenBackendModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080d1a]/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="text-cyan-400 font-mono text-sm tracking-wider font-semibold">RN</span>
            <span>{PORTFOLIO_DATA.personal.name}</span>
          </a>

          {/* Zone 2: Single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`transition-colors whitespace-nowrap shrink-0 relative py-1 text-xs tracking-wide uppercase font-semibold ${
                    isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + Verified Social Links */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {/* Quick Social Icons */}
            <div className="flex items-center gap-3 pr-3 border-r border-slate-800 text-slate-400">
              <a
                href={PORTFOLIO_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="Visit my LinkedIn profile"
                aria-label="Visit Rajiv Kumar H N LinkedIn profile"
                className="hover:text-[#0A66C2] transition-colors p-1"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={PORTFOLIO_DATA.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                title="Watch on YouTube"
                aria-label="Visit Rajiv Kumar H N YouTube channel"
                className="hover:text-[#FF0000] transition-colors p-1"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
              <a
                href={PORTFOLIO_DATA.socials.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                aria-label="Send message to Rajiv Kumar H N on WhatsApp"
                className="hover:text-[#25D366] transition-colors p-1"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Photo Manager trigger for Rajiv */}
            <button
              onClick={onOpenPhotoModal}
              title="Change or upload portrait photo"
              aria-label="Open photo manager"
              className="p-2 text-slate-400 hover:text-cyan-300 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Backend API Server Console trigger */}
            <button
              onClick={onOpenBackendModal}
              title="Inspect Express Backend API & Server Console"
              aria-label="Open backend console"
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 text-[11px] font-mono text-slate-300 hover:text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Backend API</span>
            </button>

            {/* Primary Action Button */}
            <a
              href={PORTFOLIO_DATA.socials.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg transition-all shadow-sm shadow-cyan-900/40 hover:shadow-cyan-700/50 whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
              <span>Let's Talk</span>
            </a>
          </div>

          {/* Mobile Menu & Quick Photo Buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenPhotoModal}
              title="Change portrait photo"
              className="p-2 text-slate-400 hover:text-cyan-400 rounded-lg"
              aria-label="Manage portrait photo"
            >
              <Camera className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080d1a]/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 backdrop-blur-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-950/40 text-cyan-400 font-semibold border-l-2 border-cyan-400'
                      : 'text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBackendModal();
              }}
              className="px-3 py-2 rounded-lg text-sm font-medium text-cyan-400 hover:bg-slate-800/40 text-left flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Backend API Server Console</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4 text-slate-400">
              <a
                href={PORTFOLIO_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="hover:text-[#0A66C2]"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a
                href={PORTFOLIO_DATA.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube channel"
                className="hover:text-[#FF0000]"
              >
                <YouTubeIcon className="w-5 h-5" />
              </a>
              <a
                href={PORTFOLIO_DATA.socials.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp chat"
                className="hover:text-[#25D366]"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>

            <a
              href={PORTFOLIO_DATA.socials.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
