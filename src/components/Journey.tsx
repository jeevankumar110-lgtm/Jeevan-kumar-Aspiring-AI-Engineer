import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="swiss-border-b">
      <div className="p-6 md:p-8 swiss-border-b flex justify-between items-baseline">
        <span className="font-mono-tag">05 // CHRONOLOGICAL SEQUENCE</span>
        <span className="font-mono text-xs text-neutral-400">[ CONTINUOUS DISCOVERY ]</span>
      </div>

      <div className="p-6 md:p-8 swiss-border-b">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          An ongoing journey.
        </h2>
      </div>

      {/* Minimal Timeline / Editorial Table */}
      <div className="overflow-x-auto">
        <table className="journey-table">
          <thead>
            <tr>
              <th style={{ width: '25%' }}>FIELD &amp; DOMAIN</th>
              <th style={{ width: '20%' }}>PERIOD</th>
              <th style={{ width: '40%' }}>DESCRIPTION &amp; EXPERIENCE</th>
              <th style={{ width: '15%' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {PORTFOLIO_DATA.journey.map((item, index) => (
              <tr key={index}>
                <td>
                  <span className="font-heading font-bold text-base block text-neutral-900 dark:text-neutral-100">
                    {item.field}
                  </span>
                  <span className="font-mono text-xs text-neutral-500">
                    {item.sub}
                  </span>
                </td>
                <td className="font-mono text-xs text-neutral-600 dark:text-neutral-400">
                  {item.period}
                </td>
                <td className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-body">
                  {item.description}
                </td>
                <td>
                  <span className="inline-block px-2 py-0.5 font-mono text-[11px] bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
