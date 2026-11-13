import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  onShowToast: (msg: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onShowToast }) => {
  const [isColorMode, setIsColorMode] = useState(false);

  const togglePortraitTone = () => {
    setIsColorMode(!isColorMode);
    onShowToast(!isColorMode ? 'Portrait mode: Natural Color' : 'Portrait mode: Swiss Monochrome');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" class-name="swiss-border-b relative" className="swiss-border-b relative">
      <div className="hero-editorial-grid">
        {/* Left Hero Block */}
        <div className="hero-cell">
          <div className="space-y-2">
            <p className="font-mono-tag">An aspiring AI engineer.</p>
            <p className="font-mono-tag">Exploring the intersection of technology and creativity.</p>
            <div className="status-pill mt-3">
              <span className="pulse-dot"></span>
              <span>Open to learning opportunities</span>
            </div>
          </div>

          {/* Oversized Headline Left */}
          <div className="my-auto py-8">
            <div className="hero-giant-word">i'm</div>
            <div className="hero-giant-word">jeevan</div>
            <div className="hero-giant-word">kumar</div>
          </div>

          {/* Bottom Microcopy */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-xs leading-relaxed font-body">
              {PORTFOLIO_DATA.personal.introBlurb}
            </p>
            <div className="font-mono text-[10px] text-neutral-400">
              LOCATION: {PORTFOLIO_DATA.personal.location.toUpperCase()} // {PORTFOLIO_DATA.personal.year}
            </div>
          </div>
        </div>

        {/* Center Portrait Frame */}
        <div
          className="hero-portrait-frame group"
          id="portrait-wrapper"
          title={`${PORTFOLIO_DATA.personal.name} — Editorial Portrait`}
        >
          <img
            src={PORTFOLIO_DATA.personal.portraitImage}
            alt={`${PORTFOLIO_DATA.personal.name} — Editorial Portrait`}
            className={`hero-portrait-img ${isColorMode ? 'editorial-color' : 'editorial-bw'}`}
            id="hero-portrait-display"
          />

          {/* Editorial Interactive Controls - Swiss Professional Aesthetic */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-[var(--bg-primary)]/90 text-[var(--text-primary)] font-mono text-[10px] px-3.5 py-2 border border-[var(--border-color)] backdrop-blur-md z-20 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="tracking-wider">PORTRAIT // {PORTFOLIO_DATA.personal.name.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePortraitTone}
                className="hover:underline transition cursor-pointer font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                title="Toggle Portrait Tone"
              >
                {isColorMode ? '[ Natural Tone ]' : '[ Studio Monochrome ]'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Hero Block */}
        <div className="hero-cell">
          <div className="flex justify-between items-start">
            <p className="font-mono-tag">
              Building ideas into<br />practical solutions.
            </p>
            <p className="font-mono-tag text-right">
              Based in<br />{PORTFOLIO_DATA.personal.location}.
            </p>
          </div>

          {/* Oversized Headline Right */}
          <div className="my-auto py-8">
            <div className="hero-giant-word">and i</div>
            <div className="hero-giant-word">build</div>
            <div className="hero-giant-word">solutions.</div>
          </div>

          {/* Actions & CTA */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="bracket-link cursor-pointer"
              >
                (CONTACT ME)
              </button>
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="bracket-link cursor-pointer"
              >
                (ALL WORK)
              </button>
            </div>
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="btn-primary flex-1 text-center"
              >
                Explore My Work
              </button>
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="btn-secondary flex-1 text-center"
              >
                Let's Connect
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Sub-Headline Strip */}
      <div className="swiss-border-t grid grid-cols-1 md:grid-cols-12 bg-neutral-50 dark:bg-neutral-900/30">
        <div className="md:col-span-8 p-6 md:p-8 md:border-r border-neutral-200 dark:border-neutral-800 flex items-center">
          <p className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            {PORTFOLIO_DATA.personal.heroQuote}
          </p>
        </div>
        <div className="md:col-span-4 p-6 md:p-8 flex flex-col justify-center font-mono text-xs text-neutral-600 dark:text-neutral-400">
          <span className="text-neutral-400 text-[10px] uppercase tracking-wider">Professional Title</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-200 mt-0.5">
            {PORTFOLIO_DATA.personal.subTitle}
          </span>
        </div>
      </div>
    </section>
  );
};
