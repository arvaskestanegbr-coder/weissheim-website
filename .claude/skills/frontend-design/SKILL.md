---
name: frontend-design
description: Use this skill when creating or improving frontend interfaces, UI components, landing pages, or visual design. Activates when the user asks to build, redesign, or improve any visual/UI element.
---

# Frontend Design

Create distinctive, production-grade frontend interfaces that avoid generic AI aesthetics.

## Before Writing Any Code

Establish a clear aesthetic direction by understanding:
- **Purpose**: What is this interface trying to achieve?
- **Audience**: Who will use or view it?
- **Tone**: Minimalist, maximalist, editorial, brutalist, retro-futuristic, organic?
- **Memorable quality**: What makes this design specific to this context — not interchangeable?

## Core Design Principles

### Typography
- Choose fonts that are beautiful, unique, and interesting
- Avoid generic fonts like Arial and Inter as primary typefaces
- Use type scale with intention — contrast between heading weights and body creates hierarchy
- Consider variable fonts for expressive, performance-friendly typography

### Color & Theme
- Commit to a cohesive palette with a dominant color and sharp accents
- Use CSS custom properties (variables) for all color values
- Avoid clichéd color schemes (blue-for-tech, green-for-health)
- Consider unexpected color relationships — muted with one electric accent

### Motion & Animation
- Implement CSS-only animations where possible (no JS dependency)
- Use scroll-triggered reveals for high-impact moments
- Transitions should feel intentional, not decorative
- Respect `prefers-reduced-motion`

### Spatial Composition
- Use asymmetry and unexpected layouts — break the grid deliberately
- Overlap elements to create depth
- Strategic negative space is as important as content
- Avoid predictable card-grid monotony

### Visual Details
- Add atmosphere: subtle textures, gradients, noise overlays
- Use contextual visual effects that reinforce the product's character
- Every visual detail should serve the aesthetic or the user

## Anti-Patterns to Avoid

Never produce these generic AI aesthetics:
- Overused typefaces (Inter, Roboto, Open Sans as primary fonts)
- Clichéd color schemes (generic blue/white SaaS palette)
- Predictable layouts (hero → features → pricing → CTA, without visual identity)
- Cookie-cutter components that lack context-specific character
- Flat, textureless surfaces with no atmosphere
- Symmetric, perfectly grid-aligned everything

## Implementation Standard

Code must be:
- **Production-grade and functional** — not mockups, real working code
- **Visually striking and memorable** — intentional aesthetic, not default Tailwind
- **Cohesive** — typography, color, motion, and layout decisions reinforce each other

Whether the design is maximalist or minimalist — the key is **intentionality and context-specific character**.

## For This Project (WEISSHEIM)

- Premium German household product — laundry organizer
- 3 color variants: Himmelblau, Beige, Schwarz
- Target: German consumers, Amazon conversion
- Existing stack: React 18 + TypeScript + Tailwind CSS + shadcn/ui
- Existing aesthetic: clean, minimal, navy/white — can be elevated, not replaced
