import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Episode } from '../data/portfolio';
import { EASE, Tilt } from './fx';
import { PosterBackdrop } from './Poster';

export default function EpisodeCard({ episode, index }: { episode: Episode; index: number }) {
  const [season, ep] = episode.code.split(' ');
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <motion.article
        className="w-[80vw] shrink-0 snap-start sm:w-[52vw] md:w-[38vw] lg:w-[30vw] xl:w-[26vw]"
        initial={{ opacity: 0, y: 30, rotateY: -8 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      >
        <Tilt max={7} className="group h-full rounded-xl">
          <div className="flex h-full flex-col overflow-hidden rounded-xl bg-ink-2 ring-1 ring-white/10 transition duration-500 group-hover:ring-crimson-2/60">
            <div className="relative aspect-video overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-cine)] group-hover:scale-110">
                <PosterBackdrop palette={episode.palette}>
                  <span className="absolute -bottom-6 right-2 font-display text-[7.5rem] leading-none text-white/[0.09]">{ep}</span>
                </PosterBackdrop>
              </div>
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="rounded bg-black/50 px-2 py-0.5 text-[10px] font-bold tracking-[0.2em] text-bone backdrop-blur">{season}</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-bone/80">EPISODE {ep.replace('E', '')}</span>
              </div>
              <h4 className="absolute bottom-4 left-4 right-4 font-display text-3xl leading-none tracking-wide text-bone [transform:translateZ(30px)] sm:text-4xl">{episode.title}</h4>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <div className="mb-2 flex items-center justify-between text-[11px] text-smoke">
                <span className="font-semibold text-mist">{episode.runtime}</span>
                <button
                  type="button"
                  onClick={() => setDetailsOpen(true)}
                  aria-label={`View details for ${episode.title}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-[12px] text-bone transition hover:border-bone hover:bg-bone hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
                >
                  ▶
                </button>
              </div>
              <p className="text-sm leading-relaxed text-bone/80">{episode.description}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                {episode.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] text-mist">
                    {t}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setDetailsOpen(true)}
                className="mt-4 self-start text-xs font-bold tracking-[0.14em] text-bone/70 transition hover:text-bone"
              >
                VIEW EPISODE DETAILS ↗
              </button>
            </div>
          </div>
        </Tilt>
      </motion.article>

      {detailsOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDetailsOpen(false);
          }}
          role="presentation"
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`episode-title-${episode.code.replace(/\s/g, '-')}`}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#111014] p-6 shadow-2xl sm:p-8"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-[10px] font-bold tracking-[0.25em] text-mist">{season} · EPISODE {ep.replace('E', '')}</p>
                <h3 id={`episode-title-${episode.code.replace(/\s/g, '-')}`} className="font-display text-3xl text-bone sm:text-4xl">{episode.title}</h3>
                <p className="mt-2 text-xs text-mist">{episode.runtime}</p>
              </div>
              <button
                type="button"
                onClick={() => setDetailsOpen(false)}
                aria-label="Close episode details"
                className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-bone hover:bg-white/10"
              >
                ✕
              </button>
            </div>
            <p className="text-sm leading-7 text-bone/80">{episode.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {episode.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/[0.07] px-3 py-1.5 text-xs text-mist">{tag}</span>
              ))}
            </div>
            {(episode.github || episode.live) ? (
              <div className="mt-7 flex flex-wrap gap-3">
                {episode.github && (
                  <a href={episode.github} target="_blank" rel="noreferrer" className="rounded-lg bg-bone px-4 py-2.5 text-sm font-bold text-ink transition hover:opacity-85">
                    View GitHub ↗
                  </a>
                )}
                {episode.live && (
                  <a href={episode.live} target="_blank" rel="noreferrer" className="rounded-lg border border-white/25 px-4 py-2.5 text-sm font-bold text-bone transition hover:bg-white/10">
                    Live Demo ↗
                  </a>
                )}
              </div>
            ) : (
              <p className="mt-7 text-xs leading-relaxed text-mist">This episode highlights education or research. No project link has been added for it yet.</p>
            )}
          </motion.section>
        </div>
      )}
    </>
  );
}
