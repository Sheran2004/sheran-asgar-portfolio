# SHERAN ASGAR — THE SERIES

A cinematic, streaming-inspired portfolio for Mohammad Sheran Asgar, combining a Netflix-like opening with a recruiter-friendly project, skills, education, and profile experience.

## Run locally

Requirements: Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Before publishing

- Review `src/data/portfolio.ts` and verify every project description, skill, and date.
- Add a preferred headshot if desired. The current artwork is a monogram, not a personal photograph.
- Add your preferred public email in `profile.email` in `src/data/portfolio.ts` if you want email buttons.
- Upload your latest resume PDF to `public/assets/` and wire it into the resume download flow if you want a downloadable PDF. The site currently renders the portfolio resume sheet directly to avoid linking to someone else's PDF.
- Add verified public repository and live-demo URLs to the relevant project objects.

## Stack

React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lenis smooth scrolling.
