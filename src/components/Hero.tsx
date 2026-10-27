import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LinkedInIcon, YouTubeIcon, WhatsAppIcon } from './SocialIcons';
import { usePortrait } from '../context/PortraitContext';
import { ArrowDown, ArrowUpRight, Play, Sparkles, Camera } from 'lucide-react';

interface HeroProps {
  onOpenPhotoModal: () => void;
}

type PoseMode = 'walking-entrance' | 'confident-hero' | 'thoughtful' | 'presentation';

export const Hero: React.FC<HeroProps> = ({ onOpenPhotoModal }) => {
  const { portraitUrl, isCustomPhoto } = usePortrait();
  const [poseMode, setPoseMode] = useState<PoseMode>('walking-entrance');
  const [animationCycle, setAnimationCycle] = useState(0);

  // Automatically transition from the walking entrance to confident hero pose after 2.8s
  useEffect(() => {
    if (poseMode === 'walking-entrance') {
      const timer = setTimeout(() => {
        setPoseMode('confident-hero');
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [poseMode, animationCycle]);

  const handleReplayWalking = () => {
    setPoseMode('walking-entrance');
    setAnimationCycle((prev) => prev + 1);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Motion variants for portrait modes
  const portraitVariants = {
    // Stage 1: Walking-style entrance (lateral entry with gentle vertical cadence and natural settle)
    'walking-entrance': {
      x: [120, 70, 30, 0],
      y: [12, -4, 6, 0],
      scale: [0.95, 0.98, 0.99, 1],
      opacity: [0, 0.7, 0.95, 1],
      transition: {
        duration: 2.6,
        times: [0, 0.35, 0.7, 1],
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
    // Stage 2: Confident Hero pose (subtle natural breathing elevation)
    'confident-hero': {
      x: 0,
      y: [0, -6, 0],
      scale: 1,
      opacity: 1,
      transition: {
        y: {
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      },
    },
    // Stage 3: Thoughtful pose (refined slight tilt and focus zoom)
    thoughtful: {
      x: 0,
      y: -2,
      scale: 1.03,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    // Stage 4: Presentation pose (confident forward stance with enhanced presence)
    presentation: {
      x: 0,
      y: -8,
      scale: 1.02,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#050811] bg-grid-subtle"
    >
      {/* Background ambient lighting and cyan rim spotlights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Hierarchy & Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Professional Specialization Kicker (No Pill Enclosure) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-cyan-400">
              <span>AI Research & Marketing Specialist</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400 font-normal">Bangalore, India</span>
            </div>

            {/* Display Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
                {PORTFOLIO_DATA.personal.name}
              </h1>
              <p className="mt-3 text-lg sm:text-xl font-medium text-cyan-300/90 tracking-tight">
                {PORTFOLIO_DATA.personal.subheadline}
              </p>
            </div>

            {/* Supporting Statement */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
              {PORTFOLIO_DATA.personal.statement}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, 'projects')}
                className="px-6 py-3 rounded-xl bg-white text-slate-950 font-semibold text-sm hover:bg-slate-200 transition-all flex items-center gap-2 shadow-lg shadow-white/5 group"
              >
                <span>Explore My Work</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="px-6 py-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-200 font-semibold text-sm hover:bg-slate-800 hover:border-cyan-400 transition-all flex items-center gap-2 shadow-lg shadow-cyan-950/30"
              >
                <span>Let's Connect</span>
              </a>
            </div>

            {/* Verified Social Connect Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <span className="text-slate-500 uppercase tracking-wider text-[11px] font-semibold">
                Direct Profiles:
              </span>
              <div className="flex items-center gap-5">
                <a
                  href={PORTFOLIO_DATA.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#0A66C2] transition-colors group"
                  aria-label="Visit my LinkedIn profile"
                >
                  <LinkedInIcon className="w-4 h-4 text-slate-400 group-hover:text-[#0A66C2] transition-colors" />
                  <span className="font-medium text-slate-300 group-hover:text-white">LinkedIn</span>
                </a>

                <span className="text-slate-700">·</span>

                <a
                  href={PORTFOLIO_DATA.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#FF0000] transition-colors group"
                  aria-label="Watch on YouTube"
                >
                  <YouTubeIcon className="w-4 h-4 text-slate-400 group-hover:text-[#FF0000] transition-colors" />
                  <span className="font-medium text-slate-300 group-hover:text-white">YouTube</span>
                </a>

                <span className="text-slate-700">·</span>

                <a
                  href={PORTFOLIO_DATA.socials.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors group"
                  aria-label="Chat with Rajiv on WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4 text-slate-400 group-hover:text-[#25D366] transition-colors" />
                  <span className="font-medium text-slate-300 group-hover:text-white">WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Authentic Animated Portrait & Cinematic Pose Director */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md mx-auto">
              
              {/* Outer Decorative Glow & Frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-cyan-500/20 via-blue-500/10 to-transparent blur-xl opacity-75" />

              {/* Portrait Container */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0c1322] to-[#060a14] border border-cyan-500/25 shadow-2xl aspect-[3/4] flex items-center justify-center">
                
                {/* Background studio ambient lighting behind the portrait */}
                <div className="absolute inset-0 bg-radial-spotlight opacity-40 pointer-events-none" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${poseMode}-${animationCycle}-${portraitUrl}`}
                    variants={portraitVariants}
                    animate={poseMode}
                    className="relative w-full h-full"
                  >
                    <img
                      src={portraitUrl}
                      alt="Rajiv Kumar H N - AI Research & Marketing Specialist"
                      className="w-full h-full object-cover object-top select-none"
                      referrerPolicy="no-referrer"
                      loading="eager"
                    />

                    {/* Subtle bottom contrast scrim */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#060a14] via-[#060a14]/60 to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Status Indicator / Identity Preservation Tag */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-medium text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>
                      {poseMode === 'walking-entrance'
                        ? 'Cinematic Entrance'
                        : poseMode === 'thoughtful'
                        ? 'Thoughtful Pose'
                        : poseMode === 'presentation'
                        ? 'Presentation Pose'
                        : 'Confident Hero Pose'}
                    </span>
                  </div>

                  {/* Photo Customizer Trigger */}
                  <button
                    onClick={onOpenPhotoModal}
                    title="Change or upload portrait photo"
                    className="p-1.5 rounded-full bg-black/60 hover:bg-cyan-950/80 backdrop-blur-md border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtitle caption over photo footer */}
                <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
                  <p className="text-xs font-semibold text-white tracking-wide">
                    {PORTFOLIO_DATA.personal.name}
                  </p>
                  <p className="text-[11px] text-cyan-300/80">
                    AI Research Associate Intern · Nammaweb
                  </p>
                </div>
              </div>

              {/* Interactive Pose Director / Cinematic Motion Controls */}
              <div className="mt-4 p-2 rounded-2xl bg-[#090f1e]/90 border border-slate-800/90 shadow-lg flex items-center justify-between gap-1 text-[11px]">
                <button
                  onClick={handleReplayWalking}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all text-center flex items-center justify-center gap-1 ${
                    poseMode === 'walking-entrance'
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                  title="Replay cinematic walking entrance motion"
                >
                  <Play className="w-3 h-3" />
                  <span>Walking</span>
                </button>

                <button
                  onClick={() => setPoseMode('confident-hero')}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all text-center ${
                    poseMode === 'confident-hero'
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Standing
                </button>

                <button
                  onClick={() => setPoseMode('thoughtful')}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all text-center ${
                    poseMode === 'thoughtful'
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Thoughtful
                </button>

                <button
                  onClick={() => setPoseMode('presentation')}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all text-center flex items-center justify-center gap-1 ${
                    poseMode === 'presentation'
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Present</span>
                </button>
              </div>

              {isCustomPhoto && (
                <p className="text-[10px] text-center text-cyan-400/80 mt-1.5">
                  Using your personalized uploaded photograph
                </p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Editorial Trust & Capability Strip below hero split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 pt-6 border-t border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-slate-400">
          <div>
            <span className="block text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
              01. AI Research
            </span>
            <span className="font-medium text-slate-200 text-sm mt-0.5 block">
              AI Index Survey
            </span>
            <span className="text-[11px] text-slate-400">Institutional AI readiness</span>
          </div>

          <div>
            <span className="block text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
              02. Future Search
            </span>
            <span className="font-medium text-slate-200 text-sm mt-0.5 block">
              GEO & AEO Protocols
            </span>
            <span className="text-[11px] text-slate-400">Generative engine citations</span>
          </div>

          <div>
            <span className="block text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
              03. Growth Engine
            </span>
            <span className="font-medium text-slate-200 text-sm mt-0.5 block">
              AI Lead Generation
            </span>
            <span className="text-[11px] text-slate-400">Intent-driven funnel models</span>
          </div>

          <div>
            <span className="block text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
              04. Collaboration
            </span>
            <span className="font-medium text-slate-200 text-sm mt-0.5 block">
              Nammaweb Internship
            </span>
            <span className="text-[11px] text-slate-400">Research & marketing focus</span>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="flex justify-center mt-8">
        <a
          href="#about"
          onClick={(e) => scrollToSection(e, 'about')}
          className="flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors group"
          aria-label="Scroll down to About section"
        >
          <span className="tracking-widest uppercase text-[10px] font-medium">Scroll</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:text-cyan-400 text-slate-400" />
        </a>
      </div>
    </section>
  );
};
