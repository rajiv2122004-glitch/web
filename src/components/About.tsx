import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { usePortrait } from '../context/PortraitContext';
import { ArrowUpRight, Compass, Cpu, TrendingUp } from 'lucide-react';

export const About: React.FC = () => {
  const { portraitUrl } = usePortrait();

  const corePillars = [
    {
      icon: Cpu,
      title: 'AI & Generative Search',
      description:
        'Demystifying how LLMs and generative search engines surface, synthesize, and cite brand knowledge.',
    },
    {
      icon: TrendingUp,
      title: 'High-Intent Acquisition',
      description:
        'Bridging organic search visibility with automated, intent-driven customer acquisition pipelines.',
    },
    {
      icon: Compass,
      title: 'Empirical Research',
      description:
        'Grounding marketing hypotheses in structured surveys, data analytics, and real user adoption metrics.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#070b16] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-3">
            <span>01</span>
            <span className="text-slate-600">/</span>
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Exploring the Frontier of AI & Search Visibility
          </h2>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Portrait & Snapshot Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-[#0c1322] border border-slate-800 shadow-xl group">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={portraitUrl}
                  alt="Rajiv Kumar H N"
                  className="w-full h-full object-cover object-top filter brightness-[0.98] group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              <div className="p-5 border-t border-slate-800/80 bg-[#090f1e]/90">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {PORTFOLIO_DATA.personal.name}
                    </h3>
                    <p className="text-xs text-cyan-400 mt-0.5">
                      {PORTFOLIO_DATA.personal.headline}
                    </p>
                  </div>
                  <div className="text-right text-xs text-slate-400">
                    <span className="block text-[11px] text-slate-400">Location</span>
                    <span className="font-medium text-slate-200">Bangalore, IN</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span>Affiliation: Nammaweb Intern</span>
                  <a
                    href={PORTFOLIO_DATA.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    <span>LinkedIn Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Unboxed Professional Metrics */}
            <div className="p-5 rounded-2xl bg-[#090f1e]/60 border border-slate-800/70 text-xs text-slate-300 space-y-2.5">
              <div className="text-slate-400 font-medium text-[11px] uppercase tracking-wider">
                Specialization Summary
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Primary Disciplines</span>
                <span className="font-medium text-slate-200">SEO · GEO · AEO</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Research Focus</span>
                <span className="font-medium text-slate-200">AI Readiness & Institutional Adoption</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400">Growth Focus</span>
                <span className="font-medium text-slate-200">AI-Driven Lead Generation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div className="prose prose-invert max-w-none space-y-5 text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              {PORTFOLIO_DATA.personal.aboutParagraphs.map((paragraph, index) => (
                <p key={index} className="text-slate-200">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Respectful Nammaweb Context Callout (Without thick colored accent border) */}
            <div className="p-6 rounded-2xl bg-[#0c1426] border border-cyan-500/20 text-slate-300">
              <h4 className="text-sm font-semibold text-cyan-300 mb-2">
                Research Collaboration at Nammaweb
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {PORTFOLIO_DATA.personal.nammawebMention}
              </p>
            </div>

            {/* Core Working Pillars */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-400">
                Core Focus Areas
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {corePillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="p-5 rounded-xl bg-[#090f1e] border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-cyan-400 mb-3" />
                      <h5 className="text-sm font-semibold text-white mb-1.5">{pillar.title}</h5>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Connect Action */}
            <div className="pt-2 flex items-center gap-4">
              <a
                href={PORTFOLIO_DATA.socials.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Start a direct conversation on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
