import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'direction', 'achievements', 'projects', 'journey', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="header-nav" id="site-header">
        <div className="nav-container">
          {/* Left Nav Items */}
          <nav className="nav-links-left" aria-label="Main Navigation">
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, 'hero')}
              className={`nav-item ${activeSection === 'hero' ? 'active' : ''}`}
            >
              HOME
            </a>
            <a
              href="#about"
              onClick={(e) => handleLinkClick(e, 'about')}
              className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}
            >
              ABOUT
            </a>
            <a
              href="#projects"
              onClick={(e) => handleLinkClick(e, 'projects')}
              className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`}
            >
              ALL WORK
            </a>
          </nav>

          {/* Center Monogram */}
          <div className="text-center">
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, 'hero')}
              className="brand-monogram"
              title={PORTFOLIO_DATA.personal.name}
            >
              {PORTFOLIO_DATA.personal.monogram}
            </a>
          </div>

          {/* Right Nav Items */}
          <div className="nav-links-right">
            <a
              href="#achievements"
              onClick={(e) => handleLinkClick(e, 'achievements')}
              className={`nav-item ${activeSection === 'achievements' ? 'active' : ''}`}
            >
              ACHIEVEMENTS
            </a>
            <a
              href="#journey"
              onClick={(e) => handleLinkClick(e, 'journey')}
              className={`nav-item ${activeSection === 'journey' ? 'active' : ''}`}
            >
              JOURNEY
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}
            >
              CONTACT
            </a>

            {/* Professional Theme Switcher */}
            <button
              onClick={onToggleTheme}
              className="theme-switch-btn ml-3 flex items-center gap-1.5"
              title="Toggle Theme (Swiss Light / Executive Dark)"
              aria-label="Toggle Theme"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${theme === 'light' ? 'bg-amber-600' : 'bg-emerald-400'}`}></span>
              <span>{theme === 'light' ? 'Swiss Light' : 'Executive Dark'}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-1.5 text-neutral-800 dark:text-neutral-200"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer md:hidden ${mobileOpen ? 'open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <span className="font-heading font-bold text-xl">{PORTFOLIO_DATA.personal.monogram}</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col space-y-6 text-xl font-heading font-semibold uppercase tracking-wider">
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, 'hero')}
            className="hover:opacity-60 transition"
          >
            HOME
          </a>
          <a
            href="#about"
            onClick={(e) => handleLinkClick(e, 'about')}
            className="hover:opacity-60 transition"
          >
            ABOUT
          </a>
          <a
            href="#direction"
            onClick={(e) => handleLinkClick(e, 'direction')}
            className="hover:opacity-60 transition"
          >
            DIRECTION
          </a>
          <a
            href="#achievements"
            onClick={(e) => handleLinkClick(e, 'achievements')}
            className="hover:opacity-60 transition"
          >
            ACHIEVEMENTS
          </a>
          <a
            href="#projects"
            onClick={(e) => handleLinkClick(e, 'projects')}
            className="hover:opacity-60 transition"
          >
            ALL WORK
          </a>
          <a
            href="#journey"
            onClick={(e) => handleLinkClick(e, 'journey')}
            className="hover:opacity-60 transition"
          >
            JOURNEY
          </a>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="hover:opacity-60 transition"
          >
            CONTACT
          </a>
        </nav>
        <div className="mt-auto pt-8 border-t border-neutral-200 dark:border-neutral-800 font-mono text-xs text-neutral-500">
          <p>{PORTFOLIO_DATA.personal.name} — {PORTFOLIO_DATA.personal.title}</p>
          <p className="mt-1">{PORTFOLIO_DATA.personal.location} // {PORTFOLIO_DATA.personal.year}</p>
        </div>
      </div>
    </>
  );
};
