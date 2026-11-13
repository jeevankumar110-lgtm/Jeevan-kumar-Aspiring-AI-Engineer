import React, { useState } from 'react';
import { PORTFOLIO_DATA, ProjectData } from '../data/portfolioData';
import { CheckCircle2, ExternalLink, Play, Sparkles } from 'lucide-react';

interface ProjectsProps {
  onOpenProject: (project: ProjectData) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenProject }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'productivity' | 'utility'>('all');

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.categoryTag === activeFilter;
  });

  return (
    <section id="projects" className="swiss-border-b">
      {/* Editorial Section Header */}
      <div className="p-6 md:p-10 swiss-border-b flex flex-col md:flex-row justify-between md:items-end gap-6 bg-neutral-50/50 dark:bg-neutral-900/20">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-color)]"></span>
            <span className="font-mono-tag text-xs tracking-wider text-[var(--accent-color)]">
              04 // SELECTED WORK &amp; COMPLETED REPERTOIRE
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Actual Completed Projects.
          </h2>
          <p className="font-body text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl">
            Functional web applications built with clean vanilla web architectures, robust client-side state handling, and interactive user interfaces.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 border transition cursor-pointer font-medium ${
              activeFilter === 'all'
                ? 'bg-[var(--accent-color)] text-[var(--accent-invert)] border-[var(--accent-color)] shadow-sm'
                : 'border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--accent-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            All Work [{PORTFOLIO_DATA.projects.length}]
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('productivity')}
            className={`px-4 py-2 border transition cursor-pointer font-medium ${
              activeFilter === 'productivity'
                ? 'bg-[var(--accent-color)] text-[var(--accent-invert)] border-[var(--accent-color)] shadow-sm'
                : 'border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--accent-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Productivity [1]
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('utility')}
            className={`px-4 py-2 border transition cursor-pointer font-medium ${
              activeFilter === 'utility'
                ? 'bg-[var(--accent-color)] text-[var(--accent-invert)] border-[var(--accent-color)] shadow-sm'
                : 'border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--accent-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Utility [1]
          </button>
        </div>
      </div>

      {/* Large Editorial Showcase Rows */}
      <div className="divide-y divide-[var(--border-color)]">
        {filteredProjects.map((project, index) => (
          <article
            key={project.id}
            className="p-6 md:p-12 transition-colors hover:bg-neutral-50/40 dark:hover:bg-neutral-900/10 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Expansive Preview Frame */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div
                  className="relative rounded-lg overflow-hidden border border-[var(--border-color)] bg-neutral-950 cursor-pointer shadow-md group-hover:border-[var(--accent-color)] transition-all duration-300"
                  onClick={() => onOpenProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onOpenProject(project);
                  }}
                  aria-label={`Open interactive demo for ${project.title}`}
                >
                  {/* Top Bar on Preview */}
                  <div className="flex justify-between items-center px-4 py-2.5 bg-[#1A1C20] border-b border-[#2B2E34] text-xs font-mono text-neutral-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                      <span className="ml-2 text-neutral-300 text-[11px]">{project.filename}</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Ready to Run
                    </span>
                  </div>

                  {/* Main SVG Preview Image */}
                  <div className="aspect-[16/10] overflow-hidden bg-neutral-950 flex items-center justify-center relative">
                    <img
                      src={project.image}
                      alt={`${project.title} Interface Preview`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    
                    {/* Hover Overlay with Launch Indicator */}
                    <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="px-5 py-2.5 rounded bg-[var(--accent-color)] text-[var(--accent-invert)] font-mono text-xs font-bold tracking-wider flex items-center gap-2 shadow-xl">
                        <Play className="w-3.5 h-3.5 fill-current" />
                        LAUNCH INTERACTIVE DEMO
                      </div>
                    </div>
                  </div>

                  {/* Bottom Preview Substrip */}
                  <div className="px-4 py-2 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] flex justify-between items-center text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                    <span>ARCHITECTURE: CLIENT-SIDE SPA</span>
                    <span className="text-[var(--text-primary)] font-semibold">CLICK TO TEST RUN</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Details & Features */}
              <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-xs font-bold text-[var(--accent-color)] tracking-widest">
                      {project.number}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 border border-neutral-200 dark:border-neutral-700 rounded-sm">
                      {project.badgeCategory}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3 font-heading">
                    {project.title}
                  </h3>

                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-6 font-body">
                    "{project.description}"
                  </p>

                  {/* Implemented Features Highlights */}
                  <div className="space-y-2 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                      Key Implemented Features
                    </span>
                    <div className="grid grid-cols-1 gap-2 text-xs font-body text-neutral-700 dark:text-neutral-300">
                      {project.features.slice(0, 4).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="pt-4 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bracket-link text-xs hover:underline flex items-center gap-1.5"
                  >
                    <span>GitHub Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => onOpenProject(project)}
                    className="btn-primary py-2 px-5 text-xs font-mono cursor-pointer flex items-center gap-2"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>View Live Interactive Demo</span>
                  </button>
                </div>
              </div>

            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
