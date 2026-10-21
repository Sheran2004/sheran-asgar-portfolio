import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Theme = 'dark' | 'light';
type TextSize = 'normal' | 'large' | 'larger';

const THEME_KEY = 'sheran-portfolio-theme';
const TEXT_SIZE_KEY = 'sheran-portfolio-text-size';

export default function AccessibilityControls() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem(THEME_KEY) === 'light'
        ? 'light'
        : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [textSize, setTextSize] = useState<TextSize>(() => {
    try {
      const saved = localStorage.getItem(TEXT_SIZE_KEY);

      return saved === 'large' || saved === 'larger'
        ? saved
        : 'normal';
    } catch {
      return 'normal';
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.textSize = textSize;

    try {
      localStorage.setItem(THEME_KEY, theme);
      localStorage.setItem(TEXT_SIZE_KEY, textSize);
    } catch {
      // Preferences still work for the current session.
    }
  }, [theme, textSize]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <style>
        {`
          html {
            transition: background-color 250ms ease, color 250ms ease;
          }

          html[data-text-size="large"] {
            font-size: 18px;
          }

          html[data-text-size="larger"] {
            font-size: 20px;
          }

          html[data-theme="light"] body {
            background-color: #f5f2ed;
            color: #191919;
          }

          html[data-theme="light"] {
            color-scheme: light;
          }

          html[data-theme="dark"] {
            color-scheme: dark;
          }

          @media (prefers-reduced-motion: reduce) {
            html {
              transition: none !important;
            }
          }
        `}
      </style>

      <div className="fixed top-24 right-5 z-[150]">
        <AnimatePresence>
          {isOpen && (
            <motion.section
              id="accessibility-panel"
              role="region"
              aria-label="Theme and accessibility settings"
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="mb-3 w-[min(290px,calc(100vw-40px))] rounded-xl border border-white/15 bg-[#151515] p-5 text-white shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold">Display settings</h2>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close accessibility settings"
                  className="rounded-md px-2 py-1 text-white/70 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500"
                >
                  ✕
                </button>
              </div>

              <div className="mb-5">
                <p className="mb-2 text-sm text-white/65">Color theme</p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    aria-pressed={theme === 'dark'}
                    onClick={() => setTheme('dark')}
                    className={`min-h-10 rounded-lg border px-3 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 ${
                      theme === 'dark'
                        ? 'border-red-500 bg-red-600 text-white'
                        : 'border-white/15 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    🌙 Dark
                  </button>

                  <button
                    type="button"
                    aria-pressed={theme === 'light'}
                    onClick={() => setTheme('light')}
                    className={`min-h-10 rounded-lg border px-3 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 ${
                      theme === 'light'
                        ? 'border-red-500 bg-red-600 text-white'
                        : 'border-white/15 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    ☀️ Light
                  </button>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm text-white/65">Text size</p>

                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      ['normal', 'A'],
                      ['large', 'A+'],
                      ['larger', 'A++'],
                    ] as const
                  ).map(([size, label]) => (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={textSize === size}
                      onClick={() => setTextSize(size)}
                      className={`min-h-10 rounded-lg border px-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 ${
                        textSize === size
                          ? 'border-red-500 bg-red-600 text-white'
                          : 'border-white/15 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-white/45">
                Your display preferences are saved on this device.
              </p>
            </motion.section>
          )}
        </AnimatePresence>

        <button
          type="button"
          aria-label="Open theme and accessibility settings"
          aria-controls="accessibility-panel"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="ml-auto flex min-h-12 min-w-12 items-center justify-center rounded-full border border-white/20 bg-red-600 px-4 text-xl text-white shadow-lg shadow-red-950/30 transition hover:scale-105 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
        >
          {isOpen ? '✕' : '⚙'}
        </button>
      </div>
    </>
  );
}