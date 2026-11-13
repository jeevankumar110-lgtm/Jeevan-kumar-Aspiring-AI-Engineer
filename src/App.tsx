/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Direction } from './components/Direction';
import { Achievements } from './components/Achievements';
import { Projects } from './components/Projects';
import { Journey } from './components/Journey';
import { Philosophy } from './components/Philosophy';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { PORTFOLIO_DATA, ProjectData } from './data/portfolioData';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Initialize theme: Professional Swiss Editorial (Light by default)
  useEffect(() => {
    const saved = (localStorage.getItem('jk_theme') as 'light' | 'dark') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('jk_theme', next);
    document.documentElement.setAttribute('data-theme', next);
    showToast(`Switched to ${next === 'light' ? 'Swiss Editorial [Light]' : 'Executive Obsidian [Dark]'}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Scroll Progress and Floating Pill
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cursor spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current && window.matchMedia('(pointer: fine)').matches) {
        spotlightRef.current.style.left = `${e.clientX}px`;
        spotlightRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSelectProjectById = (id: string) => {
    const found = PORTFOLIO_DATA.projects.find((p) => p.id === id);
    if (found) {
      setSelectedProject(found);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Precision Swiss Grid Paper Overlay */}
      <div className="architectural-grid" aria-hidden="true" />

      {/* Subtle Desktop Spotlight */}
      <div ref={spotlightRef} className="cursor-spotlight hidden lg:block" aria-hidden="true" />

      {/* Scroll Progress Bar */}
      <div
        id="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Master Site Wrapper */}
      <div className="site-wrapper">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <Hero onShowToast={showToast} />
        <About />
        <Direction />
        <Achievements />
        <Projects onOpenProject={(proj) => setSelectedProject(proj)} />
        <Journey />
        <Philosophy />
        <Contact onShowToast={showToast} />
        <Footer onSelectProjectById={handleSelectProjectById} />
      </div>

      {/* Interactive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Floating Back to Top Pill */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`floating-top-pill cursor-pointer ${showBackToTop ? 'visible' : ''}`}
        aria-label="Back to top"
      >
        <span>↑</span>
        <span>TOP</span>
      </button>

      {/* Toast Notice */}
      <div
        className={`toast-notice ${toastMessage ? 'show' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toastMessage}
      </div>
    </div>
  );
}
