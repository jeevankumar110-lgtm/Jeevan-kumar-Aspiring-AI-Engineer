import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="swiss-border-b">
      <div className="p-6 md:p-8 swiss-border-b flex justify-between items-baseline">
        <span className="font-mono-tag">01 // ABOUT ME</span>
        <span className="font-mono text-xs text-neutral-400">[ ACADEMIC &amp; AI DIRECTION ]</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Large Editorial Heading & Tagline */}
        <div className="lg:col-span-5 p-8 md:p-14 lg:border-r border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-[0.95]">
              Technology<br />meets<br />creativity.
            </h2>
            <div className="w-12 h-0.5 bg-neutral-900 dark:bg-neutral-100 mb-6"></div>
            <p className="font-heading text-lg text-neutral-700 dark:text-neutral-300 font-medium leading-snug">
              An aspiring engineer exploring the possibilities of intelligent technology.
            </p>
          </div>
          <div className="hidden lg:block pt-16 font-mono text-xs text-neutral-400">
            <span>DISCIPLINE:</span>
            <p className="font-bold text-neutral-900 dark:text-neutral-200 mt-1">
              {PORTFOLIO_DATA.academic.discipline}
            </p>
          </div>
        </div>

        {/* Right Side: Clean Editorial Content */}
        <div className="lg:col-span-7 p-8 md:p-14 space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed text-base md:text-lg">
          <p className="font-heading text-xl md:text-2xl font-medium text-neutral-900 dark:text-neutral-100 leading-snug">
            I'm {PORTFOLIO_DATA.personal.name}, a 1st-year B.Tech student passionate about software development, artificial intelligence, and creative problem-solving.
          </p>

          <p>
            I'm currently pursuing my undergraduate degree and building a rigorous foundation in computational thinking, software engineering, and artificial intelligence. My current hands-on curriculum and self-directed study focus on Python, web development, and Generative AI.
          </p>

          <p>
            I value learning through execution rather than abstract theory alone. Building projects—from CLI decision tools to interactive state machines—has allowed me to internalize syntax logic, edge-case validation, and structured debugging.
          </p>

          <p>
            Beyond coursework, I actively participate in collegiate hackathons and ideathons. These intensive sprints challenge me to decompose real-world constraints, brainstorm collaboratively under pressure, and translate napkin concepts into functional software prototypes.
          </p>

          {/* Verified Academic Snapshot */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-neutral-200 dark:border-neutral-800 text-xs font-mono">
            <div>
              <span className="text-neutral-400 block mb-1">DEGREE PROGRAM</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {PORTFOLIO_DATA.academic.degree}
              </span>
            </div>
            <div>
              <span className="text-neutral-400 block mb-1">CORE TOOLSET</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {PORTFOLIO_DATA.academic.toolset}
              </span>
            </div>
            <div>
              <span className="text-neutral-400 block mb-1">LEARNING FOCUS</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {PORTFOLIO_DATA.academic.focus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
