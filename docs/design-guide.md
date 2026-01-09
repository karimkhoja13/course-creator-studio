# Fluidcast Design Guide

This document defines the visual design system for Fluidcast applications. It provides CSS snippets, color tokens, and component patterns to ensure consistency across all frontends.

## 1. Brand Philosophy

Fluidcast is a **confidence engine**. Our design language balances two opposing forces:

| State | Name | When Used | Feeling |
|-------|------|-----------|---------|
| **Fluidity** | Learning State | User is absorbing concepts | Calm, organic, adaptable |
| **Structure** | Fluid Defense | User is proving competence | Alert, high-contrast, focused |

Design decisions should map to these emotional goals:
- **Reduce anxiety** during learning (soft glows, breathing animations)
- **Build confidence** during challenges (clear feedback, amber accents)
- **Feel productive** always (minimal friction, fast interactions)

---

## 2. Color System

### CSS Custom Properties

```css
:root {
  /* Brand Colors */
  --fluid-cyan: #2DD4BF;
  --fluid-purple: #A78BFA;
  --fluid-amber: #F59E0B;

  /* Backgrounds (Indigo-based) */
  --fluid-bg-deep: #0C0A1D;
  --fluid-bg-surface: #1A1635;
  --fluid-bg-elevated: #252046;

  /* Text */
  --fluid-text-primary: #E2E8F0;
  --fluid-text-muted: #94A3B8;

  /* Borders */
  --fluid-border: rgba(255, 255, 255, 0.1);
  --fluid-border-accent: #2E2A5E;
}
```

### Color Reference

| Token | Hex | Usage |
|-------|-----|-------|
| Electric Cyan | `#2DD4BF` | Primary actions, focus states, "Architect" voice, links |
| Liquid Purple | `#A78BFA` | Terminal actions, code highlights, "Hacker" voice |
| Alert Amber | `#F59E0B` | Fluid Defense mode only - challenges, high stakes |
| Void Deep | `#0C0A1D` | Page background, deepest layer |
| Surface | `#1A1635` | Cards, panels, secondary surfaces |
| Elevated | `#252046` | Popups, modals, dropdowns |
| Mist White | `#E2E8F0` | Primary text |
| Text Muted | `#94A3B8` | Secondary text, descriptions, placeholders |
| Border Accent | `#2E2A5E` | Dividers, inactive icons |

### State-Based Color Usage

**Learning State (default):**
- Primary accent: Cyan (`#2DD4BF`)
- Glow effects use cyan-purple gradient

**Fluid Defense State:**
- Primary accent: Amber (`#F59E0B`)
- Glow effects use amber
- Higher contrast, more urgent feel

---

## 3. Typography

We distinguish between **Human Language** and **Machine Language**.

### Font Stacks

```css
:root {
  --font-sans: 'Inter', 'Geist Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

| Type | Font | Usage |
|------|------|-------|
| Sans-Serif | Inter, Geist Sans | UI text, explanations, buttons, questions |
| Monospace | JetBrains Mono | Code snippets, terminal commands, file paths |

**Note:** Enable font ligatures for monospace to reinforce "Pro" aesthetics.

```css
.code {
  font-family: var(--font-mono);
  font-feature-settings: "liga" 1, "calt" 1;
}
```

---

## 4. Glassmorphism ("Dark Glass")

Our signature visual style uses glassmorphism to create depth without clutter. Surfaces should feel like they **float in space** rather than being contained in boxes.

### Depth Philosophy: Shadows Over Borders

**Prefer shadows for depth, use borders sparingly.** Hard borders create rigid edges that feel "boxy." Instead, create depth through:

1. **Layered box-shadows** for floating effect
2. **Inset highlights** (`inset 0 1px 0 rgba(...)`) to simulate light catching on glass
3. **Background color differences** for pane separation
4. **Soft glows** for active/accent states

Borders are acceptable as fallback for:
- Accessibility (distinguishing clickable regions)
- Environments where shadows render poorly
- Very subtle structural separation

### Base Glass Surface

```css
.fluid-glass {
  background: rgba(255, 255, 255, 0.03);
  border: none;
  backdrop-filter: blur(8px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),  /* Top highlight */
    0 4px 24px rgba(0, 0, 0, 0.25),            /* Floating shadow */
    0 1px 3px rgba(0, 0, 0, 0.1);              /* Subtle contact shadow */
}

.fluid-glass:hover {
  background: rgba(255, 255, 255, 0.05);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 2px 6px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);  /* Subtle lift */
}
```

### Elevated Surface (Popups, Modals)

```css
.fluid-popup {
  background: rgba(26, 22, 53, 0.95);
  border: none;
  backdrop-filter: blur(12px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 8px 40px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.05);  /* Ultra-subtle outline if needed */
}
```

### Active/Selected State (Cyan Glow)

```css
.fluid-glass-active {
  background: rgba(45, 212, 191, 0.03);
  box-shadow:
    inset 0 1px 0 rgba(45, 212, 191, 0.15),
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(45, 212, 191, 0.1),        /* Soft glow */
    0 0 0 1px rgba(45, 212, 191, 0.15);      /* Accent outline */
}
```

### Fluid Defense State

```css
.fluid-glass-defense {
  background: rgba(245, 158, 11, 0.03);
  box-shadow:
    inset 0 1px 0 rgba(245, 158, 11, 0.1),
    0 4px 24px rgba(0, 0, 0, 0.25),
    0 0 20px rgba(245, 158, 11, 0.05),
    0 0 0 1px rgba(245, 158, 11, 0.1);
}
```

### Pane Separation (Without Borders)

For separating major UI regions (sidebars, panels), use directional shadows instead of border lines:

```css
.left-pane {
  background: linear-gradient(180deg, rgba(26, 22, 53, 0.98) 0%, rgba(26, 22, 53, 0.95) 100%);
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3);  /* Shadow on right edge */
}

.right-pane {
  background: linear-gradient(180deg, rgba(26, 22, 53, 0.98) 0%, rgba(26, 22, 53, 0.95) 100%);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.3);  /* Shadow on left edge */
}
```

---

## 5. Motion & Animation

### Easing

UI elements should **morph**, not snap. Use this easing for all transitions:

```css
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
```

### Spring Animation (for layout changes)

When using Framer Motion or similar:

```js
const liquidSpring = {
  type: "spring",
  stiffness: 300,
  damping: 25,
  mass: 0.8,
};
```

### Pulse Glow (Idle/Breathing Effect)

Reduces user anxiety during idle states:

```css
@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.4;
    filter: drop-shadow(0 0 4px rgba(45, 212, 191, 0.3));
  }
  50% {
    opacity: 0.8;
    filter: drop-shadow(0 0 12px rgba(45, 212, 191, 0.6));
  }
}

.pulse-glow-slow {
  animation: pulse-glow 3s ease-in-out infinite;
}
```

### Fast Pulse (Defense Mode Urgency)

```css
@keyframes pulse-grow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.9;
  }
}

.animate-pulse-fast {
  animation: pulse-grow 0.75s ease-in-out infinite;
}
```

---

## 6. Component Patterns

### Primary Button

```css
.btn-primary {
  border: none;
  background: rgba(45, 212, 191, 0.15);
  color: #2DD4BF;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    inset 0 1px 0 rgba(45, 212, 191, 0.3),
    0 2px 8px rgba(45, 212, 191, 0.2),
    0 0 0 1px rgba(45, 212, 191, 0.2);
}

.btn-primary:hover {
  background: rgba(45, 212, 191, 0.2);
  box-shadow:
    inset 0 1px 0 rgba(45, 212, 191, 0.4),
    0 4px 16px rgba(45, 212, 191, 0.3),
    0 0 0 1px rgba(45, 212, 191, 0.3);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Secondary Button (Ghost)

```css
.btn-secondary {
  border: none;
  background: rgba(255, 255, 255, 0.05);
  color: var(--fluid-text-primary);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.25);
}
```

### Gradient Button (Cyan-Purple)

```css
.btn-gradient {
  background: linear-gradient(135deg, rgba(45, 212, 191, 0.15), rgba(167, 139, 250, 0.15));
  border: none;
  color: var(--fluid-text-primary);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 2px 8px rgba(45, 212, 191, 0.15);
}

.btn-gradient:hover {
  background: linear-gradient(135deg, rgba(45, 212, 191, 0.2), rgba(167, 139, 250, 0.2));
  box-shadow:
    inset 0 1px 0 rgba(45, 212, 191, 0.2),
    0 4px 16px rgba(45, 212, 191, 0.2);
}
```

### Text Input

```css
.input {
  width: 100%;
  border: none;
  background: rgba(255, 255, 255, 0.04);
  color: var(--fluid-text-primary);
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 2px 8px rgba(0, 0, 0, 0.15);
}

.input::placeholder {
  color: var(--fluid-text-muted);
  opacity: 0.5;
}

.input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.06);
  box-shadow:
    inset 0 1px 0 rgba(45, 212, 191, 0.15),
    0 4px 16px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(45, 212, 191, 0.2),
    0 0 20px rgba(45, 212, 191, 0.05);
}
```

### Glass Card with Accent Bar

```css
.card-accent {
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  overflow: hidden;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 4px 16px rgba(0, 0, 0, 0.2);
}

.card-accent::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: #2DD4BF;
  box-shadow: 0 0 8px rgba(45, 212, 191, 0.4);
}

.card-accent:hover {
  background: rgba(255, 255, 255, 0.04);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 6px 24px rgba(0, 0, 0, 0.25);
}
```

### Radial Glow Effect (Play Button)

```css
.glow-ring {
  background: radial-gradient(
    circle,
    rgba(45, 212, 191, 0.4) 0%,
    rgba(167, 139, 250, 0.3) 50%,
    transparent 70%
  );
}

/* Defense mode variant */
.glow-ring-defense {
  background: radial-gradient(
    circle,
    rgba(245, 158, 11, 0.5) 0%,
    rgba(245, 158, 11, 0.4) 50%,
    transparent 70%
  );
}
```

### Links

```css
a {
  color: #2DD4BF;
  text-decoration: underline;
  transition: filter 0.2s;
}

a:hover {
  filter: brightness(1.1);
}
```

---

## 7. Tailwind CSS Reference

If using Tailwind, here are common utility patterns:

```js
// tailwind.config.js (extend)
{
  colors: {
    fluid: {
      cyan: '#2DD4BF',
      purple: '#A78BFA',
      amber: '#F59E0B',
      'bg-deep': '#0C0A1D',
      'bg-surface': '#1A1635',
      'bg-elevated': '#252046',
      'text-primary': '#E2E8F0',
      'text-muted': '#94A3B8',
      'border-accent': '#2E2A5E',
    }
  }
}
```

Common class patterns:
- **Primary button:** `bg-[rgba(45,212,191,0.15)] text-[#2DD4BF] shadow-[inset_0_1px_0_rgba(45,212,191,0.3),0_2px_8px_rgba(45,212,191,0.2)]`
- **Secondary button:** `bg-[rgba(255,255,255,0.05)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.2)]`
- **Input focus:** `focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_0_1px_rgba(45,212,191,0.2)] focus:outline-none`
- **Glass surface:** Use layered shadows instead of borders for depth

---

## 8. Accessibility Notes

- **Contrast:** Mist White (`#E2E8F0`) on Void Deep (`#0C0A1D`) meets WCAG AA standards
- **Focus states:** Always use visible focus indicators (cyan border)
- **Motion:** Respect `prefers-reduced-motion` for users who disable animations
- **Text alternatives:** All interactive elements need proper `aria-label` attributes
