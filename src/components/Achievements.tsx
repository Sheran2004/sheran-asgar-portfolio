import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { achievements, certifications } from '../data/portfolio';
import { EASE, SectionHeading, Tilt } from './fx';

function Laurel({ side }: { side: 'l' | 'r' }) {
  return (
    <svg
      viewBox="0 0 30 64"
      className={`h-14 w-auto text-[#d9b46a] ${
        side === 'r' ? '-scale-x-100' : ''
      }`}
      aria-hidden
    >
      <path
        d="M26 62C10 52 4 36 8 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      {[10, 18, 26, 34, 42, 50].map((y, i) => (
        <ellipse
          key={y}
          cx={i < 2 ? 9 : 8 + i * 1.6}
          cy={y}
          rx="5"
          ry="2.2"
          fill="currentColor"
          opacity="0.85"
          transform={`rotate(-40 ${8 + i * 1.6} ${y})`}
        />
      ))}
    </svg>
  );
}

export default function Achievements() {
  const rail = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState('');
  const [selectedIssuer, setSelectedIssuer] = useState('All');

  const issuers = useMemo(
    () => Array.from(new Set(certifications.map((c) => c.issuer))),
    [],
  );

  const filteredCertifications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return certifications.filter((certification) => {
      const matchesSearch =
        !query ||
        certification.name.toLowerCase().includes(query) ||
        certification.issuer.toLowerCase().includes(query);

      const matchesIssuer =
        selectedIssuer === 'All' ||
        certification.issuer === selectedIssuer;

      return matchesSearch && matchesIssuer;
    });
  }, [search, selectedIssuer]);

  return (
    <>
      <SectionHeading kicker="Awards season" title="Top Moments" />

      {/* Achievement cards */}
      <div className="gutter grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 [perspective:1400px]">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 50, rotateX: 18 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{
              duration: 0.9,
              delay: index * 0.08,
              ease: EASE,
            }}
          >
            <Tilt max={8} className="group h-full rounded-2xl">
              <article className="relative flex h-full min-h-[340px] flex-col items-center overflow-hidden rounded-2xl bg-[radial-gradient(120%_80%_at_50%_0%,#2a1f10,#0d0b08_60%,#07070a)] px-5 pb-6 pt-8 text-center ring-1 ring-[#d9b46a]/20 transition duration-500 group-hover:ring-[#d9b46a]/60">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9b46a]/70 to-transparent"
                />

                <div
                  aria-hidden
                  className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#d9b46a]/10 blur-3xl transition duration-700 group-hover:bg-[#d9b46a]/25"
                />

                <div className="relative flex items-center gap-1">
                  <Laurel side="l" />

                  <div className="px-1">
                    <p className="text-[9px] font-bold uppercase leading-tight tracking-[0.24em] text-[#d9b46a]">
                      {achievement.laurel}
                    </p>
                  </div>

                  <Laurel side="r" />
                </div>

                <h3 className="relative mt-6 font-display text-[2.1rem] leading-[0.92] tracking-wide text-bone">
                  {achievement.title}
                </h3>

                <p className="relative mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d9b46a]">
                  {achievement.org}
                </p>

                <p className="relative mt-4 text-[13px] leading-relaxed text-bone/70">
                  {achievement.detail}
                </p>

                {achievement.link ? (
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="relative mt-auto inline-flex min-h-10 items-center gap-1 pt-5 text-xs font-semibold tracking-wide text-bone underline decoration-[#d9b46a]/60 underline-offset-4 hover:decoration-[#d9b46a]"
                  >
                    View certificate ↗
                  </a>
                ) : (
                  <span className="relative mt-auto pt-5 text-xs text-smoke">
                    Achievement highlight
                  </span>
                )}
              </article>
            </Tilt>
          </motion.div>
        ))}
      </div>

      {/* Certifications */}
      <section className="mt-16" aria-labelledby="certifications-heading">
        <div className="gutter mb-5">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-crimson-2">
            Learning & professional growth
          </p>

          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3
                id="certifications-heading"
                className="font-display text-2xl tracking-wide text-bone sm:text-3xl"
              >
                CERTIFICATIONS
              </h3>

              <p className="mt-1 text-sm text-mist">
                {filteredCertifications.length} of {certifications.length}{' '}
                credentials
              </p>
            </div>

            <p className="text-xs text-smoke">
              {issuers.length} issuing organizations
            </p>
          </div>
        </div>

        {/* Search and issuer filters */}
        <div className="gutter space-y-4">
          <label htmlFor="certification-search" className="sr-only">
            Search certifications
          </label>

          <div className="relative max-w-xl">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-smoke"
            >
              ⌕
            </span>

            <input
              id="certification-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search certificates or issuers..."
              className="min-h-12 w-full rounded-xl border border-white/10 bg-ink-2 py-3 pl-11 pr-4 text-sm text-bone outline-none transition placeholder:text-smoke focus:border-crimson-2 focus:ring-2 focus:ring-crimson-2/20"
            />
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter certifications by issuer"
          >
            {['All', ...issuers].map((issuer) => {
              const active = selectedIssuer === issuer;

              return (
                <button
                  key={issuer}
                  type="button"
                  onClick={() => setSelectedIssuer(issuer)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    active
                      ? 'border-bone bg-bone text-ink'
                      : 'border-white/10 bg-white/[0.03] text-mist hover:border-crimson-2/60 hover:text-bone'
                  }`}
                >
                  {issuer}
                </button>
              );
            })}
          </div>
        </div>

        {/* Certification cards */}
        <div className="group/rail relative mt-3">
          {filteredCertifications.length > 0 ? (
            <div
              ref={rail}
              className="rail gutter grid grid-cols-1 gap-3 py-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredCertifications.map((certification, index) => (
                <motion.article
                  key={`${certification.issuer}-${certification.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index, 5) * 0.04,
                    ease: EASE,
                  }}
                  className="group/card relative flex min-h-[190px] flex-col overflow-hidden rounded-xl bg-ink-2 p-5 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:ring-crimson-2/50"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson-2/70 to-transparent opacity-0 transition group-hover/card:opacity-100"
                  />

                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-md border border-crimson-2/20 bg-crimson-2/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-crimson-2">
                      {certification.issuer}
                    </span>

                    <span aria-hidden="true" className="text-sm text-smoke">
                      ↗
                    </span>
                  </div>

                  <h4 className="mt-5 text-sm font-semibold leading-relaxed text-bone">
                    {certification.name}
                  </h4>

                  <div className="mt-auto pt-5">
                    {certification.link ? (
                      <a
                        href={certification.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="link"
                        className="inline-flex min-h-9 items-center gap-2 text-xs font-semibold text-bone underline decoration-crimson-2/60 underline-offset-4 transition hover:text-crimson-2"
                      >
                        View certificate
                        <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <p className="text-xs text-smoke">
                        Verification link not added yet
                      </p>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div
              className="gutter py-14 text-center"
              role="status"
              aria-live="polite"
            >
              <p className="font-display text-2xl text-bone">
                NO CERTIFICATES FOUND
              </p>

              <p className="mt-2 text-sm text-mist">
                Try another search term or issuer.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSelectedIssuer('All');
                }}
                className="mt-5 rounded-lg border border-white/15 px-4 py-2 text-sm text-bone transition hover:border-crimson-2"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}