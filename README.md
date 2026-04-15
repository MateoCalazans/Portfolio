# Mateo Calazans — Portfolio

Personal developer portfolio for Mateo Calazans, Shopify Developer & Software Engineer.

## Tech Stack

- **React 19** + **Vite 6** + **TypeScript**
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — scroll-triggered and entrance animations
- **Lucide React** — SVG icon library
- **Unicorn Studio** — animated hero background

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── CustomCursor.tsx    # Custom cursor with hover scaling
│   ├── Footer.tsx          # Minimal footer with social links
│   ├── Navbar.tsx          # Sticky nav with blur-on-scroll
│   └── TypewriterEffect.tsx # Cycling role titles
├── sections/
│   ├── Hero.tsx            # Full-screen hero with Unicorn Studio bg
│   ├── About.tsx           # Two-column: text + animated code block
│   ├── Skills.tsx          # Marquee ticker + skill category cards
│   ├── Experience.tsx      # Vertical timeline with animated cards
│   ├── Work.tsx            # Store portfolio cards with hover effects
│   ├── Education.tsx       # UFRN degree card
│   └── Contact.tsx         # Contact info + form
├── App.tsx                 # Root component
├── main.tsx               # Entry point
├── index.css              # Design tokens + global styles
└── vite-env.d.ts          # Type declarations
public/
├── resume.pdf             # Downloadable CV
└── favicon.svg            # MC monogram favicon
```

## Design Tokens

| Token     | Value     |
|-----------|-----------|
| Background | `#0a0a0a` |
| Surface   | `#111111` |
| Border    | `#1f1f1f` |
| Text      | `#f0f0f0` |
| Muted     | `#888888` |
| Accent    | `#f5a623` |

## Resume

Place your resume at `public/resume.pdf`. The "Download CV" button points to this file.

## License

© 2025 Mateo Calazans. All rights reserved.
