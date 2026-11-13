import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ContactProps {
  onShowToast: (msg: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onShowToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ type: 'idle' | 'submitting' | 'success' | 'error'; message?: string }>({
    type: 'idle',
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
      onShowToast(`Copied email to clipboard: ${PORTFOLIO_DATA.personal.email}`);
    } catch {
      onShowToast(`Email: ${PORTFOLIO_DATA.personal.email}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill out all required fields before dispatching.',
      });
      return;
    }

    setStatus({ type: 'submitting' });

    setTimeout(() => {
      setStatus({
        type: 'success',
        message: `Thank you, ${name}. Your message has been received! For immediate correspondence, feel free to email ${PORTFOLIO_DATA.personal.email} directly.`,
      });
      onShowToast('Message submitted successfully!');
      setName('');
      setEmail('');
      setMessage('');
    }, 700);
  };

  return (
    <section id="contact" className="swiss-border-b">
      <div className="p-6 md:p-8 swiss-border-b flex justify-between items-baseline">
        <span className="font-mono-tag">06 // GET IN TOUCH</span>
        <span className="font-mono text-xs text-neutral-400">[ OPEN DIALOGUE ]</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Editorial Inquiries & Contact Channels */}
        <div className="lg:col-span-5 p-8 md:p-14 lg:border-r border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
              Ready to create<br />something meaningful?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed mb-8 font-body">
              Let's connect, exchange ideas, and explore opportunities to build something impactful.
            </p>

            <div className="space-y-4 font-mono text-xs">
              {/* LinkedIn */}
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <span className="text-neutral-400 block mb-1 text-[10px]">LINKEDIN:</span>
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:underline text-neutral-900 dark:text-neutral-100 break-all"
                >
                  {PORTFOLIO_DATA.personal.linkedin} ↗
                </a>
              </div>

              {/* GitHub */}
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <span className="text-neutral-400 block mb-1 text-[10px]">GITHUB:</span>
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:underline text-neutral-900 dark:text-neutral-100 break-all"
                >
                  {PORTFOLIO_DATA.personal.github} ↗
                </a>
              </div>

              {/* Email */}
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-neutral-400 text-[10px]">EMAIL:</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-[10px] text-neutral-500 hover:text-black dark:hover:text-white font-mono cursor-pointer"
                  >
                    [ COPY ]
                  </button>
                </div>
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="font-semibold text-neutral-900 dark:text-neutral-100 hover:underline flex items-center gap-1.5"
                >
                  {PORTFOLIO_DATA.personal.email} ↗
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 font-mono text-xs text-neutral-400">
            TIMEZONE: IST (UTC+05:30) • INDIA
          </div>
        </div>

        {/* Right: Minimal Contact Form */}
        <div className="lg:col-span-7 p-8 md:p-14">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="contact-name"
                className="block font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="contact-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="editorial-input"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="contact-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="editorial-input"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message or collaboration proposal..."
                className="editorial-textarea"
              ></textarea>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="submit"
                disabled={status.type === 'submitting'}
                className="btn-primary cursor-pointer disabled:opacity-50"
              >
                {status.type === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              <span className="font-mono text-[11px] text-neutral-400">
                * Client prototype. Live transmission awaits backend / mail service configuration.
              </span>
            </div>

            {status.type === 'error' && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs font-mono text-red-600 dark:text-red-400">
                {status.message}
              </div>
            )}

            {status.type === 'success' && (
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs font-mono">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Message dispatched!</span>
                <br />
                <span className="text-neutral-600 dark:text-neutral-400">{status.message}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
