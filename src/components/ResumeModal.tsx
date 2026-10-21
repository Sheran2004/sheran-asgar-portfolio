import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollLock } from '../hooks/smoothScroll';
import { EASE } from './fx';

const RESUME_URL = '/assets/Resume_Sheran.pdf';

/** Full-screen viewer for the actual resume PDF. */
export default function ResumeModal({ onClose }: { onClose: () => void }) {
  useScrollLock(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[140] flex flex-col bg-black/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Resume PDF viewer"
    >
      <div className="gutter flex min-h-16 shrink-0 items-center justify-between gap-3 pt-[env(safe-area-inset-top)]">
        <p className="truncate font-display text-2xl tracking-wide text-bone">The Full Story</p>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={RESUME_URL}
            download="Mohammad_Sheran_Asgar_Resume.pdf"
            className="flex min-h-10 items-center justify-center rounded-full bg-white/10 px-4 text-sm font-semibold text-bone transition hover:bg-white/20"
          >
            ↓ Download PDF
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Open resume PDF in a new tab"
            className="hidden h-10 items-center justify-center rounded-full bg-white/10 px-3 text-sm text-bone transition hover:bg-white/20 sm:flex"
          >
            ↗ Open
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close resume"
            data-cursor="close"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-bone hover:bg-white/20"
          >
            ✕
          </button>
        </div>
      </div>

      <motion.div
        className="gutter min-h-0 flex-1 pb-4 sm:pb-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className="h-full overflow-hidden rounded-xl bg-white">
          <iframe
            title="Mohammad Sheran Asgar resume"
            src={`${RESUME_URL}#view=FitH`}
            className="h-full w-full border-0"
          />
        </div>
        <p className="pt-2 text-center text-xs text-mist sm:hidden">
          PDF not displaying? Use Download PDF above to view it on your device.
        </p>
      </motion.div>
    </motion.div>
  );
}
