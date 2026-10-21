import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { profile, projects, type Project } from '../data/portfolio';
import { useDesktop, useReducedMotionPref } from '../hooks/useMedia';
import { EASE, RevealText } from './fx';
import ProjectCard from './ProjectCard';

type Category = 'All' | 'Full Stack' | 'AI / ML' | 'Data Analytics' | 'Frontend' | 'Research';
const categories: Category[] = ['All', 'Full Stack', 'AI / ML', 'Data Analytics', 'Frontend', 'Research'];

function matchesCategory(project: Project, category: Category) {
  if (category === 'All') return true;
  const text = `${project.title} ${project.genre} ${project.logline} ${project.stack.join(' ')}`.toLowerCase();
  if (category === 'Full Stack') return /full.?stack|react|next\.js|node\.js|express|flask|fastapi|socket\.io/.test(text);
  if (category === 'AI / ML') return /\bai\b|machine learning|deep learning|groq|yolo|whisper|llm|computer vision|tensorflow|pytorch|nlp/.test(text);
  if (category === 'Data Analytics') return /analytics|data intelligence|power bi|tableau|sql|dashboard|postgresql|customer insights|revenue/.test(text);
  if (category === 'Frontend') return /frontend|html|css|javascript|typescript|react|next\.js|vite|tailwind/.test(text);
  return /research|microscopy|ham10000|computer vision/.test(text);
}

/** ORIGINALS — searchable and filterable project collection. */
export default function Originals({ onOpen }: { onOpen: (p: Project) => void }) {
  const [category, setCategory] = useState<Category>('All');
  const [query, setQuery] = useState('');
  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => matchesCategory(p, category) && (!q || `${p.title} ${p.genre} ${p.logline} ${p.stack.join(' ')}`.toLowerCase().includes(q)));
  }, [category, query]);
  const desktop = useDesktop();
  const reduced = useReducedMotionPref();

  return (
    <>
      <div className="gutter relative z-10 mb-8 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-crimson-2">Explore the collection</p>
            <h3 className="font-display text-3xl tracking-wide text-bone sm:text-4xl">Find a project</h3>
          </div>
          <div className="flex w-full gap-2 md:max-w-sm">
            <label className="relative block min-w-0 flex-1">
              <span className="sr-only">Search projects</span>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-smoke"
              >
                ⌕
              </span>

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, skills, technologies..."
                className="min-h-11 w-full rounded-lg border border-white/15 bg-white/[0.04] pl-10 pr-4 text-sm text-bone outline-none transition placeholder:text-smoke focus:border-crimson-2/70 focus:ring-2 focus:ring-crimson-2/20"
              />
            </label>

            {(query || category !== 'All') && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('All');
                }}
                className="shrink-0 rounded-lg border border-white/15 px-3 text-xs font-semibold text-mist transition hover:border-crimson-2/60 hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-bone"
                aria-label="Clear search and category filters"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone ${category === item ? 'border-bone bg-bone text-ink' : 'border-white/15 text-mist hover:border-white/40 hover:text-bone'}`}
            >
              {item}
            </button>
          ))}
          <span className="self-center text-xs text-smoke" aria-live="polite">{filteredProjects.length} project{filteredProjects.length === 1 ? '' : 's'}</span>
        </div>
      </div>
      {filteredProjects.length === 0 ? (
        <div
          className="gutter flex min-h-[280px] flex-col items-center justify-center py-16 text-center"
          role="status"
        >
          <span className="mb-5 text-5xl text-crimson-2" aria-hidden="true">
            ⌕
          </span>

          <h4 className="font-display text-2xl tracking-wide text-bone sm:text-3xl">
            No matching projects
          </h4>

          <p className="mt-3 max-w-md text-sm leading-6 text-mist">
            We couldn't find a project matching your search. Try another keyword
            or reset your filters to explore the full collection.
          </p>

          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('All');
            }}
            className="mt-6 rounded-lg bg-crimson px-5 py-3 text-sm font-bold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
          >
            Explore all projects
          </button>
        </div>
      ) : desktop && !reduced ? (
        <PinnedOriginals
          onOpen={onOpen}
          visibleProjects={filteredProjects}
        />
      ) : (
        <RailOriginals
          onOpen={onOpen}
          visibleProjects={filteredProjects}
        />
      )}
    </>
  );
}

function Intro({ count }: { count: number }) {
  return (
    <div className="flex w-full shrink-0 flex-col justify-center lg:w-[34vw]">
      <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-crimson-2">
        <span className="h-px w-8 bg-crimson-2" /> {count} Originals · {projects[0]?.year ?? '2026'}
      </p>
      <RevealText as="h2" text="ORIGINALS" className="font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.85] text-bone" />
      <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-mist">A selection of full-stack, AI, and data-focused projects. Open any title for the details.</p>
      <p className="mt-6 hidden text-xs tracking-[0.24em] text-smoke lg:block">SCROLL TO BROWSE →</p>
    </div>
  );
}

function Outro() {
  return (
    <a href={profile.links.github} target="_blank" rel="noreferrer" data-cursor="link" className="group flex aspect-[3/4] w-[70vw] shrink-0 snap-start flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/15 text-center transition hover:border-crimson-2/60 sm:w-[44vw] lg:aspect-auto lg:h-[66vh] lg:w-[24vw]">
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 text-2xl text-bone transition group-hover:scale-110 group-hover:border-crimson-2 group-hover:text-crimson-2">↗</span>
      <span className="font-display text-3xl tracking-wide text-bone">More on GitHub</span>
      <span className="text-xs text-mist">github.com/Sheran2004</span>
    </a>
  );
}

function PinnedOriginals({ onOpen, visibleProjects }: { onOpen: (p: Project) => void; visibleProjects: Project[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const distMV = useMotionValue(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      const d = Math.max(0, track.current.scrollWidth - window.innerWidth);
      setDist(d);
      distMV.set(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [distMV, visibleProjects]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  const raw = useTransform([scrollYProgress, distMV], ([p, d]: number[]) => -p * d);
  const x = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={wrap} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_60%_at_70%_50%,rgba(229,19,43,0.10),transparent_70%)]" />
        <motion.div ref={track} style={{ x }} className="gutter relative flex items-center gap-8 pr-[12vw]" data-cursor="drag">
          <Intro count={visibleProjects.length} />
          {visibleProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onOpen={() => onOpen(p)} />)}
          <Outro />
        </motion.div>
        <div className="gutter absolute inset-x-0 bottom-8 flex items-center gap-4">
          <span className="text-[10px] font-bold tracking-[0.3em] text-smoke">ORIGINALS</span>
          <div className="h-[2px] flex-1 overflow-hidden rounded bg-white/10"><motion.div className="h-full origin-left bg-crimson" style={{ scaleX: bar }} /></div>
        </div>
      </div>
    </div>
  );
}

function RailOriginals({ onOpen, visibleProjects }: { onOpen: (p: Project) => void; visibleProjects: Project[] }) {
  return (
    <div className="py-6">
      <div className="gutter mb-6"><Intro count={visibleProjects.length} /></div>
      {visibleProjects.length ? (
        <motion.div className="rail gutter flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6" initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE }}>
          {visibleProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onOpen={() => onOpen(p)} />)}
          <Outro />
        </motion.div>
      ) : (
        <p className="gutter py-12 text-sm text-mist">No projects match this search. Try another keyword or choose “All”.</p>
      )}
    </div>
  );
}
