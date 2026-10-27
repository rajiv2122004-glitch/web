import React, { useState } from 'react';
import { PORTFOLIO_DATA, ProjectItem } from '../data/portfolioData';
import { ArrowUpRight, Sparkles, X, CheckCircle, ExternalLink, Github } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-24 bg-[#050811] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-3">
            <span>04</span>
            <span className="text-slate-600">/</span>
            <span>Featured Initiatives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Projects & Research Case Studies
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Exploring generative AI adoption, search algorithm shifts, and intelligent web platforms.
          </p>
        </div>

        {/* 2x2 Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PORTFOLIO_DATA.projects.map((project, index) => (
            <div
              key={project.id}
              className="group rounded-3xl overflow-hidden bg-[#090f1e] border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Visual Media Header with fallbacks */}
                <div
                  className="relative aspect-[16/9] w-full overflow-hidden bg-[#060a14] cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center filter brightness-[0.92] group-hover:scale-103 group-hover:brightness-100 transition-all duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Gradient contrast scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090f1e] via-[#090f1e]/20 to-transparent pointer-events-none" />

                  {/* Unboxed category tag floating */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-cyan-300 font-medium">
                      0{index + 1} · {project.category}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-8">
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {project.shortDescription}
                  </p>

                  {/* Unboxed Skills and Technologies List */}
                  <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    {project.skills.map((skill, sIdx) => (
                      <span key={skill} className="flex items-center">
                        <span className="text-slate-300 font-medium">{skill}</span>
                        {sIdx < project.skills.length - 1 && (
                          <span className="mx-2 text-slate-700">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 flex items-center justify-between border-t border-slate-800/60">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>View Case Study Details</span>
                </button>

                <div className="text-[11px] text-slate-400">
                  {project.metricsContext || 'Documented Initiative'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090f1e] border border-cyan-500/30 p-6 sm:p-8 text-slate-100 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close project modal"
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs font-mono text-cyan-400 mb-1">
                {selectedProject.category}
              </div>
              <h3 id="project-modal-title" className="text-2xl font-bold text-white pr-10">
                {selectedProject.title}
              </h3>

              {/* Modal Visual Media */}
              <div className="mt-4 rounded-2xl overflow-hidden aspect-[16/9] border border-slate-800">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* In-depth Narrative */}
              <div className="mt-6 space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Overview & Methodology
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedProject.fullDescription}
                </p>

                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 pt-2">
                  Key Strategic Highlights
                </h4>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 pt-2">
                  Applied Competencies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs py-1 px-3 rounded-lg bg-slate-900 border border-slate-700/80 text-cyan-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* External Destination Notice (Grounded link handling) */}
              <div className="mt-8 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  Project repository & publication links can be customized in <code className="text-slate-400 bg-slate-900 px-1 py-0.5 rounded">portfolioData.ts</code>.
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={PORTFOLIO_DATA.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                  >
                    <span>Discuss on LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={PORTFOLIO_DATA.socials.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl transition-colors"
                  >
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
