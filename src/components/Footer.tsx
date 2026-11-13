import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface FooterProps {
  onSelectProjectById?: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectProjectById }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="p-8 md:p-14">
      {/* Minimalist Navigation & Social Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 font-mono text-xs mb-14">
        <div className="space-y-2">
          <span className="text-neutral-400 block text-[10px] uppercase">SECTIONS</span>
          <p>
            <button onClick={() => scrollTo('hero')} className="hover:underline cursor-pointer text-left">
              ( Home )
            </button>
          </p>
          <p>
            <button onClick={() => scrollTo('about')} className="hover:underline cursor-pointer text-left">
              ( About )
            </button>
          </p>
          <p>
            <button onClick={() => scrollTo('direction')} className="hover:underline cursor-pointer text-left">
              ( Direction )
            </button>
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-neutral-400 block text-[10px] uppercase">INDEX</span>
          <p>
            <button onClick={() => scrollTo('achievements')} className="hover:underline cursor-pointer text-left">
              ( Achievements )
            </button>
          </p>
          <p>
            <button onClick={() => scrollTo('projects')} className="hover:underline cursor-pointer text-left">
              ( All Work )
            </button>
          </p>
          <p>
            <button onClick={() => scrollTo('journey')} className="hover:underline cursor-pointer text-left">
              ( Journey )
            </button>
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-neutral-400 block text-[10px] uppercase">PROJECT REPO</span>
          <p>
            <button
              onClick={() => {
                scrollTo('projects');
                if (onSelectProjectById) onSelectProjectById('1');
              }}
              className="hover:underline cursor-pointer text-left"
            >
              ( Task Tracker )
            </button>
          </p>
          <p>
            <button
              onClick={() => {
                scrollTo('projects');
                if (onSelectProjectById) onSelectProjectById('2');
              }}
              className="hover:underline cursor-pointer text-left"
            >
              ( Calculator )
            </button>
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-neutral-400 block text-[10px] uppercase">ENGAGEMENT</span>
          <p><span className="text-neutral-600 dark:text-neutral-400">( Hackathons )</span></p>
          <p><span className="text-neutral-600 dark:text-neutral-400">( Ideathons )</span></p>
          <p><span className="text-neutral-600 dark:text-neutral-400">( Python Lab )</span></p>
        </div>

        <div className="space-y-2">
          <span className="text-neutral-400 block text-[10px] uppercase">CONNECT</span>
          <p>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              ( LinkedIn )
            </a>
          </p>
          <p>
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              ( GitHub )
            </a>
          </p>
          <p>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="hover:underline"
            >
              ( Email )
            </a>
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-neutral-400 block text-[10px] uppercase">TOP</span>
          <p>
            <button
              onClick={() => scrollTo('hero')}
              className="hover:underline cursor-pointer font-bold"
            >
              ↑ Back to top
            </button>
          </p>
        </div>
      </div>

      {/* Giant Editorial Signature Display */}
      <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-baseline gap-4">
        <div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-neutral-900 dark:text-neutral-100">
            {PORTFOLIO_DATA.personal.name.toUpperCase()}
          </h2>
          <p className="font-mono text-xs text-neutral-500 mt-2">
            {PORTFOLIO_DATA.personal.title} | Developer
          </p>
        </div>
        <div className="font-mono text-xs text-neutral-500 text-left md:text-right space-y-1">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            Designed with curiosity. Built with purpose.
          </p>
          <p>© {PORTFOLIO_DATA.personal.year} {PORTFOLIO_DATA.personal.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
