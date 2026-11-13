import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Philosophy: React.FC = () => {
  return (
    <section className="swiss-border-b py-24 px-6 md:px-12 text-center relative overflow-hidden bg-neutral-50 dark:bg-neutral-900/30">
      <div className="max-w-4xl mx-auto space-y-8">
        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
          [ PERSONAL PHILOSOPHY ]
        </span>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-[1.08]">
          "Curiosity creates ideas.<br />
          Ideas inspire innovation.<br />
          Innovation shapes tomorrow."
        </h2>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed font-body">
          "{PORTFOLIO_DATA.personal.philosophySub}"
        </p>
      </div>
    </section>
  );
};
