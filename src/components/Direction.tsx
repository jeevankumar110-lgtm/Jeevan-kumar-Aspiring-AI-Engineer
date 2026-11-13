import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Direction: React.FC = () => {
  return (
    <section id="direction" className="swiss-border-b">
      <div className="p-6 md:p-8 swiss-border-b">
        <span className="font-mono-tag">02 // STRATEGIC DIRECTION</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2 max-w-4xl">
          Building at the Intersection of Technology &amp; Creativity.
        </h2>
      </div>

      {/* 4 Numbered Editorial Sections aligned to Swiss grid */}
      <div className="direction-grid">
        {PORTFOLIO_DATA.direction.map((item) => (
          <div key={item.num} className="direction-cell group">
            <div>
              <div className="direction-num">{item.num}</div>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-body">
                {item.description}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-200 dark:border-neutral-800 font-mono text-[11px] text-neutral-400">
              {item.tags}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
