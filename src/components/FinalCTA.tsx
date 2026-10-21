import { useRef, useState, type FormEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { EASE, Magnetic, Particles } from './fx';
import { SeriesMark } from './Poster';

const CONTACT_EMAIL = 'sheranasgar786@gmail.com';

export default function FinalCTA({ onReplay }: { onReplay: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.2'],
  });

  const spacing = useTransform(scrollYProgress, [0, 1], ['0.6em', '0.02em']);
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(16px)', 'blur(0px)']);
  const opacity = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  const ctas = [
    {
      label: 'LinkedIn',
      href: profile.links.linkedin,
      cursor: 'link',
    },
    {
      label: 'GitHub',
      href: profile.links.github,
      cursor: 'link',
    },
    {
      label: 'Email',
      href: `mailto:${CONTACT_EMAIL}`,
      cursor: 'link',
    },
  ];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus('');

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: `Portfolio Contact: Message from ${name}`,
            _template: 'table',
          }),
        },
      );

      const result = await response.json();

      if (!response.ok || result.success !== 'true') {
        throw new Error('Message could not be sent. Please try again.');
      }

      setStatus('Message sent successfully! Thank you for reaching out.');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus(
        'Unable to send your message right now. Please email me directly at ' +
          CONTACT_EMAIL,
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_60%,rgba(229,19,43,0.18),transparent_70%)]"
      />

      <Particles count={36} />

      <motion.p
        className="relative mb-6 text-[11px] font-bold uppercase tracking-[0.5em] text-crimson-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        The Next Episode
      </motion.p>

      <motion.h2
        className="relative font-display leading-[0.85] text-bone"
        style={{
          fontSize: 'clamp(3.4rem, 13vw, 12rem)',
          letterSpacing: spacing,
          filter: blur,
          opacity,
        }}
      >
        LET'S CONNECT…
      </motion.h2>

      <motion.div
        className="relative mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      >
        <p className="font-sans text-2xl font-semibold tracking-[0.2em] text-bone sm:text-3xl">
          {profile.displayName.toUpperCase()}
        </p>

        <p className="mt-2 text-xs font-semibold tracking-[0.4em] text-mist sm:text-sm">
          {profile.role.toUpperCase()}
        </p>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="relative mt-10 w-full max-w-xl space-y-4 text-left"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-mist"
          >
            Your Name
          </label>

          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            required
            maxLength={100}
            className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-bone outline-none transition placeholder:text-smoke focus:border-crimson"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-mist"
          >
            Your Email
          </label>

          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            maxLength={254}
            className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-bone outline-none transition placeholder:text-smoke focus:border-crimson"
          />
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-mist"
          >
            Your Message
          </label>

          <textarea
            id="contact-message"
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell me about your idea..."
            required
            minLength={10}
            maxLength={5000}
            rows={5}
            className="w-full resize-y rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-bone outline-none transition placeholder:text-smoke focus:border-crimson"
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-crimson px-7 text-sm font-bold tracking-[0.15em] text-white shadow-[0_0_35px_rgba(229,19,43,0.25)] transition hover:bg-crimson-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? 'SENDING...' : '▶ SEND MESSAGE'}
        </button>

        {status && (
          <p
            role="status"
            aria-live="polite"
            className="break-words rounded-lg border border-white/10 bg-white/5 p-3 text-center text-sm text-bone"
          >
            {status}
          </p>
        )}

        <p className="text-center text-xs text-smoke">
          Or email me directly at{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-bone underline underline-offset-4 hover:text-crimson-2"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </motion.form>

      {/* Social Links */}
      <motion.div
        className="relative mt-8 flex flex-wrap justify-center gap-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.08, delayChildren: 0.15 }}
      >
        {ctas.map((item) => (
          <motion.div
            key={item.label}
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.9 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.6, ease: EASE },
              },
            }}
          >
            <Magnetic>
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                data-cursor={item.cursor}
                className="flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-7 text-sm font-bold tracking-[0.12em] text-bone transition hover:border-bone hover:bg-white/10"
              >
                {item.label.toUpperCase()}
                <span className="text-mist">↗</span>
              </a>
            </Magnetic>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative mt-12 flex flex-wrap justify-center gap-6 text-xs font-semibold tracking-[0.24em] text-smoke">
        <button
          type="button"
          onClick={() => scrollTo(0, { offset: 0 })}
          className="hover:text-bone"
        >
          ↺ WATCH AGAIN
        </button>

        <button
          type="button"
          onClick={onReplay}
          className="hover:text-bone"
        >
          ▶ REPLAY OPENING
        </button>
      </div>

      <footer className="relative mt-12 w-full px-4 text-center">
        <div className="mb-2 text-base">
          <SeriesMark />
        </div>

        <p className="text-[11px] leading-relaxed text-smoke">
          © {new Date().getFullYear()} {profile.displayName}. A personal,
          streaming-inspired portfolio — not affiliated with any streaming
          service.
        </p>
      </footer>
    </section>
  );
}