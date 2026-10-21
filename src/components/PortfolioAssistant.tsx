import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Message = {
  role: 'assistant' | 'user';
  content: string;
};

const suggestions = [
  'Tell me about your projects',
  'What are your technical skills?',
  'What is your education?',
  'How can I contact Sheran?',
];

function getAnswer(question: string): string {
  const q = question.toLowerCase();

  if (/hello|hi\b|hey\b|namaste/.test(q)) {
    return "Hey! 👋 I'm Sheran's portfolio assistant. Ask me about his projects, skills, education, experience, or contact details.";
  }

  if (/project|built|build|work|portfolio/.test(q)) {
    return `Sheran works on full-stack, AI-powered and data-driven applications.

Some highlighted projects include:

• MPLAD Sentinel — anomaly detection and monitoring for development projects.
• Meditwin AI — an AI-focused healthcare project.
• Inkwell — a collaborative editor.
• TranscriptStudio — video/audio transcription and translation.

You can explore the Projects section to learn more about his work.`;
  }

  if (/skill|technology|tech stack|programming|language/.test(q)) {
    return `Sheran's technical toolkit includes:

• Languages: Java, Python, JavaScript and SQL.
• Frontend: React, Next.js, HTML, CSS and Tailwind CSS.
• Backend: Node.js, Express and FastAPI.
• Databases: MongoDB, MySQL and PostgreSQL.
• Analytics: Power BI, Tableau and Excel.
• Other areas: DSA, AI/ML, REST APIs and Git/GitHub.

Check the Skills section for more details.`;
  }

  if (/education|college|degree|university|study|student/.test(q)) {
    return `Sheran is pursuing a B.Tech in Computer Science and Engineering at Noida Institute of Engineering and Technology (NIET).

• Degree: B.Tech CSE
• Duration: 2023–2027
• Current CGPA: 8.10/10

He focuses on software development, AI/ML and data analytics.`;
  }

  if (/intern|experience|work experience/.test(q)) {
    return `Sheran has internship experience associated with GAO Tek, ELiteTech and Suvidha Foundation.

His portfolio highlights practical software development, technical projects and experience across different areas.

Visit the Journey and Highlights sections for more information.`;
  }

  if (/contact|email|hire|reach|connect/.test(q)) {
    return `You can contact Sheran at:

Email: sheranasgar786@gmail.com

You can also connect through LinkedIn:
linkedin.com/in/mohammad-sheran-asgar/

If you're recruiting or discussing a project, feel free to get in touch!`;
  }

  if (/resume|cv|curriculum vitae/.test(q)) {
    return `You can open Sheran's Resume section on this portfolio to view his resume and access the available download option.

His resume covers education, technical skills, selected projects, internship experience and achievements.`;
  }

  if (/certification|certificate|achievement|award|hackathon/.test(q)) {
    return `Sheran's portfolio includes a Highlights section for achievements and certifications.

His listed achievements include work on 30+ software projects and participation in Cognizant Technoverse Hackathon 2026.

Visit the Highlights section for the available details.`;
  }

  if (/github|repository|source code/.test(q)) {
    return `Explore Sheran's projects and repositories on GitHub:

https://github.com/Sheran2004

You can also open individual projects from the portfolio to explore their available links.`;
  }

  return `I can help you explore Sheran's portfolio!

Try asking me about:
• Projects and technical skills
• Education and internships
• Certifications and achievements
• Resume and contact details

Choose one of the suggested questions below to get started.`;
}

export default function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hey! 👋 I'm Sheran's Portfolio Assistant. Ask me about his projects, skills, education, or experience.",
    },
  ]);

  function sendMessage(text: string) {
    const question = text.trim();

    if (!question || isTyping) return;

    setMessages((previous) => [
      ...previous,
      { role: 'user', content: question },
    ]);

    setInput('');
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        { role: 'assistant', content: getAnswer(question) },
      ]);

      setIsTyping(false);
    }, 450);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="fixed bottom-5 right-5 z-[200] sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            aria-label="Portfolio Assistant chat"
            className="mb-4 flex h-[min(580px,75vh)] w-[min(370px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101012] shadow-[0_0_55px_rgba(225,29,72,0.18)]"
          >
            <header className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-[#260b12] to-[#111114] px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-lg font-black text-white shadow-lg shadow-rose-900/40">
                  S
                </div>

                <div>
                  <h2 className="text-sm font-bold text-white">
                    Portfolio Assistant
                  </h2>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-rose-300">
                    Sheran's Series
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                className="rounded-lg px-3 py-2 text-xl text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                ×
              </button>
            </header>

            <div
              className="flex-1 space-y-4 overflow-y-auto p-4"
              aria-live="polite"
            >
              {messages.map((message, index) => (
                <div
                  key={`${index}-${message.role}`}
                  className={`flex ${
                    message.role === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[88%] whitespace-pre-line break-words rounded-2xl px-3.5 py-3 text-sm leading-6 ${
                      message.role === 'user'
                        ? 'rounded-br-sm bg-rose-600 text-white'
                        : 'rounded-bl-sm border border-white/10 bg-white/[0.05] text-white/80'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div
                  className="text-xs text-rose-300"
                  role="status"
                >
                  Thinking…
                </div>
              )}
            </div>

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 px-4 pb-3">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-xs text-white/75 transition hover:border-rose-500/60 hover:bg-rose-500/10 hover:text-white"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-white/10 bg-black/20 p-3"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about Sheran..."
                aria-label="Ask the portfolio assistant"
                maxLength={500}
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-rose-500/60"
              />

              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-lg text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ↑
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'}
          aria-expanded={isOpen}
          className="group flex items-center gap-3 rounded-full border border-rose-400/30 bg-[#151114] py-2 pl-2 pr-5 text-white shadow-[0_8px_35px_rgba(225,29,72,0.22)] transition hover:-translate-y-1 hover:border-rose-400/70 hover:shadow-[0_10px_40px_rgba(225,29,72,0.32)]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-600 text-xl shadow-lg shadow-rose-950/50 transition group-hover:rotate-6">
            {isOpen ? '×' : '✦'}
          </span>

          <span className="text-left">
            <span className="block text-sm font-bold">
              Ask Sheran's AI
            </span>
            <span className="mt-0.5 block text-[10px] tracking-wide text-white/50">
              Explore the portfolio
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}