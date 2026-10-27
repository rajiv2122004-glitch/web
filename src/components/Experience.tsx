import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Briefcase, Building, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-[#070b16] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-3">
            <span>03</span>
            <span className="text-slate-600">/</span>
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Professional Experience & Research
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Hands-on research and marketing initiatives in emerging AI ecosystems and search algorithms.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative border-l border-slate-800 ml-3 sm:ml-6 space-y-12">
          {PORTFOLIO_DATA.experience.map((item) => (
            <div key={item.id} className="relative pl-6 sm:pl-10">
              
              {/* Timeline Node */}
              <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full bg-[#050811] border-2 border-cyan-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#090f1e] border border-slate-800/90 hover:border-cyan-500/30 transition-all">
                
                {/* Header Information (Unboxed Clean Metadata) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>{item.role}</span>
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium mt-1">
                      <Building className="w-3.5 h-3.5" />
                      <span>{item.organization}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-400">{item.type}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>Research Engagement</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="mt-4 text-sm text-slate-300 leading-relaxed font-light">
                  {item.summary}
                </p>

                {/* Responsibilities list */}
                <div className="mt-6 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Key Research & Marketing Activities
                  </div>
                  <ul className="space-y-2.5">
                    {item.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer contextual actions */}
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="text-slate-400">
                    Initiative Focus: <span className="text-slate-300">AI Index Survey & Search Engine Optimization</span>
                  </div>
                  <a
                    href={PORTFOLIO_DATA.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    <span>Verify on LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Future Expandability Note */}
        <div className="mt-12 text-center text-xs text-slate-400 max-w-lg mx-auto">
          Additional research engagements and professional appointments can be easily appended in <code className="text-slate-400 bg-slate-900 px-1 py-0.5 rounded">src/data/portfolioData.ts</code>.
        </div>
      </div>
    </section>
  );
};
