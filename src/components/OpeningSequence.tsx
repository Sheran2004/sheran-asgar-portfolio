import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useReducedMotionPref } from '../hooks/useMedia';
import { EASE, Magnetic } from './fx';

/** Cinematic, layered opening: animated light, drifting embers, depth and portrait reveal. */
const TIMELINE = [
  { at: 250, beat: 1 },
  { at: 1150, beat: 2 },
  { at: 2050, beat: 3 },
  { at: 2850, beat: 4 },
  { at: 3900, beat: 5 },
  { at: 4700, beat: 6 },
];

const particles = Array.from({ length: 32 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  delay: (i % 9) * 0.37,
  duration: 5 + (i % 6) * 1.15,
  size: 2 + (i % 3),
  drift: ((i * 17) % 90) - 45,
  opacity: 0.2 + (i % 5) * 0.12,
}));


export default function OpeningSequence({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotionPref();
  const [beat, setBeat] = useState(reduced ? 6 : 0);

  useEffect(() => {
    if (reduced) return;
    const timers = TIMELINE.map(({ at, beat }) => window.setTimeout(() => setBeat(beat), at));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') onDone();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] overflow-hidden bg-[#030204]"
      exit={{ opacity: 0, scale: 1.035, filter: 'blur(10px)' }}
      transition={{ duration: 0.85, ease: EASE }}
      role="dialog"
      aria-label="Opening titles"
    >
      {/* Deep red atmosphere and animated volumetric haze */}
      <motion.div aria-hidden className="absolute -inset-[25%]" style={{ background: 'radial-gradient(ellipse at 50% 68%, rgba(122,8,27,.42), transparent 48%), radial-gradient(ellipse at 16% 42%, rgba(91,12,33,.25), transparent 35%), radial-gradient(ellipse at 86% 45%, rgba(40,20,64,.22), transparent 36%)' }} animate={reduced ? {} : { x: ['-2%', '2%', '-1%'], y: ['1%', '-2%', '1%'], scale: [1, 1.08, 1] }} transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div aria-hidden className="absolute inset-0 opacity-60" style={{ background: 'linear-gradient(115deg, transparent 20%, rgba(255,35,69,.08) 42%, transparent 58%)', mixBlendMode: 'screen' }} animate={reduced ? {} : { x: ['-70%', '70%'] }} transition={{ duration: 7, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }} />

      {/* Fine ember particles drift upward at different speeds */}
      {!reduced && <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <motion.span key={i} className="absolute bottom-[-4%] rounded-full bg-rose-200" style={{ left: p.left, width: p.size, height: p.size, opacity: p.opacity, boxShadow: '0 0 12px rgba(255,48,78,.8)' }} animate={{ y: ['0vh', '-115vh'], x: [0, p.drift, p.drift * -0.25], opacity: [0, p.opacity, 0] }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }} />
        ))}
      </div>}

      {/* Cinematic moving beam */}
      <motion.div aria-hidden className="pointer-events-none absolute -left-[45%] top-0 h-full w-[42%] rotate-[18deg]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,32,65,.12), rgba(255,200,210,.08), transparent)', filter: 'blur(18px)' }} animate={reduced ? {} : { x: ['-20vw', '190vw'] }} transition={{ duration: 8.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }} />

      {/* Portrait depth: blurred halo behind a crisp foreground portrait/video */}
      <motion.div className="absolute inset-x-0 bottom-[-5vh] z-0 mx-auto flex h-[76vh] max-w-[1050px] items-end justify-center" initial={{ opacity: 0, scale: 1.18, filter: 'blur(24px)' }} animate={beat >= 4 ? { opacity: 0.42, scale: [1.08, 1.16, 1.08], filter: 'blur(28px)' } : { opacity: 0 }} transition={{ opacity: { duration: 1.2 }, scale: { duration: 11, repeat: Infinity, ease: 'easeInOut' }, filter: { duration: 1.4 } }} aria-hidden>
        <img src={profile.portrait.src} alt="" className="h-full w-auto max-w-none object-contain object-bottom saturate-150" style={{ filter: 'drop-shadow(0 0 65px rgba(229,19,43,.65))' }} />
      </motion.div>
      <motion.div className="absolute inset-x-0 bottom-[-2vh] z-[1] mx-auto flex h-[72vh] max-w-[900px] items-end justify-center" initial={{ opacity: 0, scale: 1.16, y: 24, filter: 'blur(18px) brightness(.45)' }} animate={beat >= 4 ? { opacity: 1, scale: [1.035, 1.09, 1.035], y: [12, -5, 12], filter: 'blur(0px) brightness(1)' } : { opacity: 0 }} transition={{ opacity: { duration: 1.4 }, scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' }, y: { duration: 9, repeat: Infinity, ease: 'easeInOut' }, filter: { duration: 1.5 } }}>
        {reduced ? <img src={profile.portrait.src} srcSet={profile.portrait.srcSet} sizes="(max-width: 768px) 100vw, 900px" alt={profile.portrait.alt} className="h-full w-auto max-w-none object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_48%,transparent_99%)]" /> : <video src="/assets/sheran-opening-motion.mp4" poster={profile.portrait.src} autoPlay muted loop playsInline preload="metadata" aria-label={profile.portrait.alt} className="h-full w-auto max-w-none object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_48%,transparent_99%)]" />}
      </motion.div>

      {/* Moving scan line and cinematic vignette */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-x-0 z-[3] h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,70,95,.7), rgba(255,220,225,.9), rgba(255,70,95,.7), transparent)', boxShadow: '0 0 24px rgba(255,30,70,.8)' }} initial={{ top: '15%', opacity: 0 }} animate={beat >= 4 && !reduced ? { top: ['15%', '88%', '15%'], opacity: [0, 0.8, 0] } : { opacity: 0 }} transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }} />
      <div aria-hidden className="absolute inset-0 z-[4] bg-[radial-gradient(ellipse_at_50%_43%,transparent_15%,rgba(0,0,0,0.28)_58%,rgba(0,0,0,0.92)_100%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-[4] h-[48vh] bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Studio title */}
      <AnimatePresence>
        {beat === 1 && <motion.div key="studio" className="absolute inset-0 z-10 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(8px)' }} transition={{ duration: 0.7 }}>
          <motion.p className="font-sans text-xs font-semibold text-mist sm:text-sm" initial={{ letterSpacing: '0.2em', opacity: 0, scale: 0.92 }} animate={{ letterSpacing: '0.55em', opacity: 1, scale: 1 }} transition={{ duration: 1.25, ease: EASE }}>{profile.originalLabel}</motion.p>
        </motion.div>}
      </AnimatePresence>

      {/* Hero typography with separate cinematic reveals */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.div aria-hidden className="mb-3 h-px w-20 bg-gradient-to-r from-transparent via-rose-400 to-transparent sm:mb-5" initial={{ width: 0, opacity: 0 }} animate={beat >= 2 ? { width: ['4rem', '11rem', '7rem'], opacity: [0, 1, 0.8] } : {}} transition={{ duration: 1.8, ease: EASE }} />
        <motion.h1 className="font-display leading-[0.82] text-bone drop-shadow-[0_8px_40px_rgba(0,0,0,0.9)]" style={{ fontSize: 'clamp(4.6rem, 20vw, 15rem)', textShadow: '0 0 55px rgba(229,19,43,.22)' }} initial={{ opacity: 0, scale: 1.32, filter: 'blur(22px)', letterSpacing: '0.48em' }} animate={beat >= 2 ? { opacity: 1, scale: 1, filter: 'blur(0px)', letterSpacing: '0.035em', y: beat >= 4 ? '-29vh' : 0 } : {}} transition={{ duration: 1.35, ease: EASE }}>
          {profile.firstName}
        </motion.h1>
        <motion.p className="font-sans text-sm font-bold text-crimson-2 [text-shadow:0_2px_20px_rgba(0,0,0,0.9)] sm:text-lg" initial={{ opacity: 0, letterSpacing: '1.3em', y: 18 }} animate={beat >= 3 ? { opacity: 1, letterSpacing: '0.65em', y: beat >= 4 ? '-29vh' : 0 } : {}} transition={{ duration: 1.05, ease: EASE }}>
          {profile.seriesTag}
        </motion.p>
        <motion.p className="mt-5 font-sans text-[9px] font-medium uppercase tracking-[0.38em] text-white/60 sm:text-[10px]" initial={{ opacity: 0, y: 12 }} animate={beat >= 4 ? { opacity: [0, 1, 0.72], y: 0 } : {}} transition={{ duration: 1.2, ease: EASE }}>
          A story in code, creativity &amp; ambition
        </motion.p>
      </div>

      {/* Role + play */}
      <div className="absolute inset-x-0 bottom-[9vh] z-20 flex flex-col items-center gap-6 px-4 text-center">
        <motion.p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-bone/90 sm:text-sm sm:tracking-[0.4em]" initial={{ opacity: 0, y: 14, filter: 'blur(5px)' }} animate={beat >= 5 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.9, ease: EASE }}>
          {profile.tagline.join('  •  ')}
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.78, y: 12 }} animate={beat >= 6 ? { opacity: 1, scale: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }}>
          <Magnetic><button type="button" data-cursor="play" onClick={onDone} tabIndex={beat >= 6 ? 0 : -1} className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-bone px-9 py-4 font-sans text-base font-bold tracking-wide text-ink shadow-[0_0_60px_rgba(229,19,43,0.45)] transition hover:bg-white">
            <motion.span aria-hidden className="absolute inset-y-0 left-[-45%] w-[35%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-rose-300/70 to-transparent" animate={reduced ? {} : { x: ['0%', '520%'] }} transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.1, ease: 'easeInOut' }} />
            <span className="relative text-lg transition-transform group-hover:scale-125">▶</span><span className="relative">PLAY</span>
          </button></Magnetic>
        </motion.div>
      </div>

      {/* Letterbox bars retract once the full title is revealed */}
      <motion.div className="absolute inset-x-0 top-0 z-30 h-[6vh] bg-black" initial={{ y: 0 }} animate={{ y: beat >= 6 ? '-100%' : 0 }} transition={{ duration: 1.15, ease: EASE }} />
      <motion.div className="absolute inset-x-0 bottom-0 z-30 h-[6vh] bg-black" initial={{ y: 0 }} animate={{ y: beat >= 6 ? '100%' : 0 }} transition={{ duration: 1.15, ease: EASE }} />
      <button type="button" onClick={onDone} className="absolute right-4 top-[calc(6vh+12px)] z-40 rounded-full border border-white/20 bg-black/20 px-4 py-2 font-sans text-[11px] font-semibold tracking-[0.2em] text-mist backdrop-blur-sm transition hover:border-white/60 hover:text-bone">SKIP INTRO</button>
    </motion.div>
  );
}
