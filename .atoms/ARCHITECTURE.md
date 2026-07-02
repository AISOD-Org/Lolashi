---
last_updated: 2026-07-02T15:33:40Z
---

# Architecture Design

## System Overview
Book author website for Sam Tiliindje promoting "Illuminati One World Government Agenda Will Fail". White-themed, animated, multi-page site with book details, author bio, ordering, and contact functionality.

## Tech Stack
- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- React Router for multi-page navigation
- Framer Motion for performant animations

## Module Design
| Module | Responsibility | Key Files |
|--------|---------------|-----------|
| Pages | Route-level page components | src/pages/Index.tsx, BookDetails.tsx, About.tsx, Order.tsx, Contact.tsx, Terms.tsx |
| Components | Shared UI components | src/components/Navbar.tsx, Footer.tsx, AnimatedSection.tsx |
| Styles | Global theme and custom styles | src/index.css, tailwind.config.ts |

## Tech Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Animation library | Framer Motion | Performant, GPU-accelerated, intersection observer support |
| Color scheme | White primary + warm gold accent | Client requested white as main color, gold fits religious/regal theme |
| Routing | React Router | Multi-page SPA with clean navigation |

## File Tree Plan
```
src/
├── pages/
│   ├── Index.tsx (Homepage with hero, book preview, CTA)
│   ├── BookDetails.tsx (Full book information)
│   ├── About.tsx (Author biography + photo)
│   ├── Order.tsx (Purchase/order page)
│   ├── Contact.tsx (Contact form + social links)
│   └── Terms.tsx (Terms & conditions)
├── components/
│   ├── Navbar.tsx (Navigation bar)
│   ├── Footer.tsx (Site footer)
│   └── AnimatedSection.tsx (Reusable scroll animation wrapper)
├── App.tsx (Router setup)
├── index.css (Theme tokens)
└── main.tsx (Entry point)
```

## Implementation Guide
1. Set up theme colors (white + gold/amber accents) in index.css
2. Create shared Navbar and Footer components
3. Build AnimatedSection wrapper for scroll-triggered animations
4. Implement all 6 pages with content from client brief
5. Wire up React Router in App.tsx

