# Portfolio (Next.js + Tailwind + GSAP)

A modern, animation-rich personal portfolio built with Next.js 15, React 19, Tailwind CSS v4, and GSAP. It showcases projects, skills, and personality with smooth interactions, scroll-driven motion, and clean UI.

## Tech Stack
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Lucide Icons

## Features
- Creative hero animations (masked reveal, float, tilt, scroll depth)
- About Me with technical/soft skills and education timeline
- Projects section with horizontal scrolling and per-slide reveals
- Responsive design and accessible components

## Getting Started
Prereqs: Node 18+ (or 20+), npm (or pnpm/yarn)

Install dependencies:
```bash
npm install
```

Run the dev server:
```bash
npm run dev
# open http://localhost:3000
```

Build and start production:
```bash
npm run build
npm run start
```

Lint:
```bash
npm run lint
```

## Project Structure
```text
src/
  app/
    _components/
      hero.tsx           # Landing hero with animations
      about-me.tsx       # About page sections and motion
      projects.tsx       # Horizontal projects carousel
    globals.css          # Tailwind + theme tokens
    layout.tsx           # Root layout
    page.tsx             # Entry page
  lib/
    smooth-scroll.tsx    # Optional GSAP ScrollSmoother wrapper
  components/
    ui/button.tsx        # Reusable button
public/
  images/                # Assets (hero, projects, backgrounds)
```

## Configuration Notes
- Tailwind v4 is enabled via `@import "tailwindcss"` in `src/app/globals.css`.
- Theme tokens and color variables are defined in `globals.css` using `@theme inline`.
- GSAP/ScrollTrigger is registered where needed inside components.

## Images
Place your images under `public/images/`, then reference them like:
```tsx
<Image src="/images/your-image.jpg" alt="..." width={...} height={...} />
```

## Customization Tips
- Update project entries in `src/lib/projects.ts` (name, image, description, techStack, links).
- Tweak animations inside `hero.tsx`, `about-me.tsx`, and `projects.tsx` (GSAP timelines).
- Adjust theme colors in `globals.css` to match your brand.

## Deployment
Any Next.js-compatible host works (Vercel recommended):
- Push to GitHub
- Import the repo to Vercel
- Build command: `npm run build`
- Output: `.next`

## Troubleshooting
- If GSAP warnings appear, ensure effects only run client-side (`"use client"`) and plugins are registered once per component.
- If images don’t load, verify paths under `public/images` and the `src` strings.

