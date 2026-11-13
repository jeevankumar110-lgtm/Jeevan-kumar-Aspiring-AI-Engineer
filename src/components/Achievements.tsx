import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Achievements: React.FC = () => {
  const ach = PORTFOLIO_DATA.achievements;

  return (
    <section id="achievements" className="swiss-border-b">
      <div className="p-6 md:p-8 swiss-border-b flex justify-between items-baseline">
        <span className="font-mono-tag">03 // INITIATIVES &amp; EXPERIENCES</span>
        <span className="font-mono text-xs text-neutral-400">[ HACKATHONS &amp; SPRINTS ]</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Prominent Feature: Hackathons & Ideathons */}
        <div className="lg:col-span-7 p-8 md:p-14 lg:border-r border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
          <div>
            <div className="font-mono text-4xl sm:text-5xl font-light text-neutral-300 dark:text-neutral-700 mb-4">
              {ach.num}
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-2">
              {ach.category}
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              {ach.title}
            </h3>
            <div className="w-12 h-0.5 bg-neutral-900 dark:bg-neutral-100 mb-6"></div>
            <p className="text-lg sm:text-xl text-neutral-800 dark:text-neutral-200 leading-relaxed font-body font-medium">
              {ach.description}
            </p>
          </div>

          <div className="pt-10 grid grid-cols-2 gap-4 border-t border-neutral-200 dark:border-neutral-800 font-mono text-xs text-neutral-600 dark:text-neutral-400 mt-8">
            <div>
              <span className="text-neutral-400 block text-[10px]">ORGANIZATION</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {ach.organization}
              </span>
            </div>
            <div>
              <span className="text-neutral-400 block text-[10px]">TENURE</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {ach.tenure}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Graphic Visual Artifact */}
        <div className="lg:col-span-5 p-8 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900/30">
          <div className="w-full max-w-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2 shadow-sm">
            <img
              src={ach.artifactImage}
              alt="Student Innovation and Hackathon Archive"
              className="w-full h-auto object-cover"
            />
            <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 font-mono text-[10px] text-neutral-500 flex justify-between">
              <span>{ach.artifactLabel}</span>
              <span>{ach.artifactVol}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
