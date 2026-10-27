import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  Search,
  Sparkles,
  Bot,
  Brain,
  Megaphone,
  UserCheck,
  FileText,
  Compass,
  Code,
  BarChart3,
  Layers,
} from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI & Search', 'Marketing & Growth', 'Development & Analysis'];

  const getSkillIcon = (id: string) => {
    switch (id) {
      case 'seo':
        return Search;
      case 'geo':
        return Sparkles;
      case 'aeo':
        return Bot;
      case 'ai-research':
        return Brain;
      case 'ai-marketing':
        return Megaphone;
      case 'lead-generation':
        return UserCheck;
      case 'content-marketing':
        return FileText;
      case 'digital-strategy':
        return Compass;
      case 'web-dev':
        return Code;
      case 'data-analysis':
        return BarChart3;
      default:
        return Layers;
    }
  };

  const filteredSkills =
    selectedCategory === 'All'
      ? PORTFOLIO_DATA.skills
      : PORTFOLIO_DATA.skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 bg-[#050811] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-3">
              <span>02</span>
              <span className="text-slate-600">/</span>
              <span>Capabilities & Disciplines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Skills & Methodological Toolkit
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
              Grounded in artificial intelligence research, search engine architecture, and high-impact digital marketing strategies.
            </p>
          </div>

          {/* Interactive Category Filter Tabs (Single-line controls) */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0b1222] border border-slate-800 overflow-x-auto max-w-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === category
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => {
            const IconComponent = getSkillIcon(skill.id);
            return (
              <div
                key={skill.id}
                className="group p-6 rounded-2xl bg-[#090f1e] border border-slate-800/90 hover:border-cyan-500/40 hover:bg-[#0c1426] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-400/40 transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {/* Unboxed category metadata tag */}
                    <span className="text-[11px] font-mono text-slate-500">
                      {skill.category}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white group-hover:text-cyan-200 transition-colors">
                    {skill.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/70 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-cyan-400 font-medium">
                    {skill.highlight}
                  </span>
                  <span className="text-slate-600 text-[11px]">Applied Discipline</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial Footnote (Anti-Slop Compliance) */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400">
            Skills practiced in production web architectures, institutional AI survey initiatives, and search engine experimentation.
          </p>
        </div>
      </div>
    </section>
  );
};
