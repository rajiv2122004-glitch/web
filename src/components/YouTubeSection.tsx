import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { YouTubeIcon } from './SocialIcons';
import { ArrowUpRight, Play, Video } from 'lucide-react';

export const YouTubeSection: React.FC = () => {
  const { youtubeShowcase } = PORTFOLIO_DATA;

  return (
    <section id="youtube" className="py-24 bg-[#070b16] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-rose-400 mb-3">
            <span>05</span>
            <span className="text-slate-600">/</span>
            <span>Channel & Video Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
            <YouTubeIcon className="w-8 h-8 text-[#FF0000]" />
            <span>Official YouTube Channel</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Exploring artificial intelligence developments, search engine optimization breakthroughs, and digital marketing practical walkthroughs.
          </p>
        </div>

        {/* Feature Showcase Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0c1322] to-[#080d1a] border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Channel Overview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-950/40 border border-red-500/20 flex items-center justify-center text-[#FF0000]">
                  <YouTubeIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {youtubeShowcase.title}
                  </h3>
                  <a
                    href={youtubeShowcase.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-rose-400 hover:text-rose-300 font-mono"
                  >
                    {youtubeShowcase.channelHandle}
                  </a>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {youtubeShowcase.description}
              </p>

              {/* Topics Explored */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Focus Topics & Themes:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {youtubeShowcase.featuredTopics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80"
                    >
                      <Video className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified External Button */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href={youtubeShowcase.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#FF0000] hover:bg-[#d90000] text-white font-semibold text-sm transition-all shadow-lg shadow-red-950/40 hover:shadow-red-900/50 flex items-center gap-2 group"
                >
                  <YouTubeIcon className="w-4 h-4" />
                  <span>Watch on YouTube</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <span className="text-xs text-slate-400">
                  Opens official channel in a new tab
                </span>
              </div>
            </div>

            {/* Right Column: Sleek Channel Teaser Card */}
            <div className="lg:col-span-5">
              <a
                href={youtubeShowcase.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl overflow-hidden bg-black/60 border border-slate-800 hover:border-red-500/40 transition-all p-6 text-center space-y-4"
              >
                <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-slate-900 to-[#120505] border border-slate-800 flex items-center justify-center relative group-hover:scale-102 transition-transform">
                  <div className="w-16 h-16 rounded-full bg-red-600/90 group-hover:bg-[#FF0000] flex items-center justify-center text-white shadow-xl transition-all shadow-red-950/60">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[11px] font-mono text-slate-400">Channel Stream</span>
                    <p className="text-xs font-semibold text-white truncate">
                      Rajiv Kumar H N — Digital & AI Series
                    </p>
                  </div>
                </div>

                <div className="text-left space-y-1">
                  <div className="text-xs font-medium text-slate-200">
                    Subscribe and follow video analyses
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Discover new episodes on AI search visibility and marketing automation.
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 group-hover:text-rose-300">
                  <span>Visit @Rajiv02-y6s1f on YouTube</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
