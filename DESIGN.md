# NOISELESS-X6 WORKFLOWS — DESIGN SYSTEM SPECIFICATION (DESIGN.md)

## 1. System Vision & Aesthetic Principles

`NOISELESS-X6 WORKFLOWS` is a standalone, high-precision engineering visualization and simulation platform for the NOISELESS-X6 dual-microphone adaptive speech enhancement and acoustic noise cancellation architecture.

### Core Visual Principles
- **Aesthetic Fusion**: Military Acoustics + Aerospace Engineering + DSP Research Laboratory + Embedded AI System + Precision Technical Documentation.
- **Strict 2D Visual Rule**: Zero 3D models, zero WebGL 3D, zero Three.js, zero fake 3D perspective cards, zero spinning spheres. Visual depth is achieved through layered 2D SVG schematics, deterministic Canvas 2D waveform oscillators, and crisp technical line work.
- **Visual Restraint**: No generic SaaS cards, no glowing cyberpunk neon gradients, no random floating particles, no meaningless decorative spinners. Every line, marker, and animation directly denotes an acoustic or digital signal processing transformation.
- **Signal as Story**: The animated signal path represents physical reality — acoustic pressure waves $x(t)$, digitized PCM streams $x[n]$, STFT time-frequency spectrograms $X(t, f)$, neural mask inference $\hat{M}(t, f)$, and anti-noise acoustic wave synthesis $y(t)$.

---

## 2. Color System & Semantic Palette

All colors are strictly semantic, grounded in military avionics and laboratory instrumentation standards.

### 2.1 Base Substrates (Dark Military Graphite & Olive)
- `--bg-primary`: `#06090e` (Deepest Void Charcoal / Substrate)
- `--bg-surface`: `#0a1118` (Instrumentation Panel Surface)
- `--bg-surface-elevated`: `#0f1a24` (Subsystem Module Container)
- `--bg-surface-sunken`: `#04070a` (Waveform Well / Canvas Substrate)
- `--bg-military-tint`: `#0c1913` (Dark Tactical Olive Wash)
- `--border-subtle`: `#16282b` (Low-contrast Structural Divider)
- `--border-default`: `#203a3d` (Standard Module Border)
- `--border-highlight`: `#345f5a` (Active Signal Path Edge)

### 2.2 Semantic Signal Accents
- `--signal-cyan`: `#00e5ff` (Reference Audio $x[n]$, Ingestion Stream, I2S Digital Bus)
- `--signal-blue`: `#3b82f6` (AI/ML Neural Features, YAMNet Latents, Complex-CRN Masks)
- `--signal-green`: `#10b981` (Speech Protected VAD, Active ANC State, Converged System)
- `--signal-amber`: `#f59e0b` (Impulse Transient Warning, Fast Attack Protection Mode)
- `--signal-red`: `#ef4444` (Severe Hardware Fault, Overrun Warning, Unbounded Error)
- `--signal-violet`: `#8b5cf6` (Spectral Feature Extraction, STFT Bin Decomposition)
- `--signal-white`: `#f1f5f9` (Engineering Annotations, Axis Tick Marks, Schema Titles)

### 2.3 Evidence & Telemetry Tier Indicators
- `--evidence-target`: `#94a3b8` (Theoretical Architectural Target — dashed badge)
- `--evidence-simulation`: `#38bdf8` (Browser-Side Deterministic DSP Simulation)
- `--evidence-measured`: `#34d399` (Benchmarked Hardware Telemetry on Pi 5 / Jetson)
- `--evidence-unbenchmarked`: `#64748b` (Pending Empirical Lab Characterization)

---

## 3. Typography Hierarchy

Using high-legibility engineered typefaces:
- **Primary Technical Sans**: `system-ui, -apple-system, 'Inter', 'Segoe UI', Roboto, sans-serif`
- **Monospace Signal & Equations**: `'JetBrains Mono', 'Fira Code', 'Roboto Mono', Menlo, Consolas, monospace`

### Scales:
- **Hero Title**: `2.75rem` / `44px` — `font-weight: 800` — `letter-spacing: -0.02em`
- **Section Headers (01-22)**: `1.5rem` / `24px` — `font-weight: 700` — `letter-spacing: 0.04em` (Uppercase with numbered prefix `01 //`)
- **Subsystem Component Headings**: `1.125rem` / `18px` — `font-weight: 600`
- **Body & Documentation**: `0.9375rem` / `15px` — `line-height: 1.65` — `color: #94a3b8`
- **Technical Monospace Labels**: `0.75rem` / `12px` — `font-weight: 600` — `letter-spacing: 0.08em` — `color: #cbd5e1`
- **Evidence Badges**: `0.6875rem` / `11px` — `font-weight: 700` — `text-transform: uppercase`

---

## 4. Layout & Grid Architecture

- **Page Max Width**: `1440px` centered with `24px` / `32px` gutter margins.
- **Top Sticky Navigation**: `54px` height, `#06090e` solid backing with `1px` bottom border `#16282b`, displaying system telemetry state, quick anchors, and persistent "LIVE LAB" trigger.
- **Side Panel Drawer**: Fixed `420px` right-side slide-over displaying detailed component metadata (Role, Input, Output, Transfer Function, Dependencies, Physical Pins).
- **Responsive Fluid Grid**:
  - Desktop (>1200px): Multi-column horizontal architecture schematics and parallel signal lanes.
  - Tablet (768px - 1199px): High-density 2-column or horizontally scrollable schematics with directional indicators.
  - Mobile (<768px): Strict linear vertical topological cascade:
    `ENVIRONMENT → MIC INGESTION → PREPROCESSING → AI/VAD → HYBRID ANC → ACOUSTIC OUTPUT → ERROR FEEDBACK`.

---

## 5. Micro-Animations & Signal Physics

### Strict Animation Semantics:
1. **Waveform Oscillators**: 60 FPS deterministic mathematical synthesis on Canvas 2D:
   - Vehicle Noise: Combined low-frequency harmonics ($50\text{Hz}, 120\text{Hz}, 240\text{Hz}$) + broadband rumble.
   - Helicopter Noise: $18\text{Hz}$ blade-pass frequency modulation with turbulent aerodynamic whoosh.
   - Gunshot / Impulse: Sub-millisecond $100\text{ms}$ attack peak followed by exponential decay envelope.
   - Human Speech: Formant synthesized phonemes with natural syllabic cadence.
2. **Signal Packets**: SVG stroke-dasharray pulses traveling along physical bus lines (I2S, ALSA capture, DAC).
3. **Filter Convergence**: Dynamic damping curve showing residual error $e[n]$ dropping from initial high energy to converged steady-state floor ($>18\text{dB}$ attenuation).
4. **Impulse Trigger**: Amber border flash on the Impulse Protection block followed by fast-clamp envelope decay and smooth recovery.
5. **Accessibility**: Full `@media (prefers-reduced-motion: reduce)` support:
   - Pauses all dynamic waveform oscillators and renders static representative oscillograms.
   - Replaces stroke animations with solid high-contrast signal arrows.

---

## 6. Structural Component Specifications

### 6.1 Technical Panel Card
```css
border: 1px solid var(--border-default);
background: var(--bg-surface);
border-radius: 4px;
padding: 1.25rem;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
```

### 6.2 Signal Connector Lines
```css
stroke: var(--signal-cyan);
stroke-width: 1.5px;
stroke-dasharray: 6 4;
animation: signalFlow 1.5s linear infinite;
```

### 6.3 Monospace Status Pill
```css
font-family: var(--font-mono);
font-size: 0.6875rem;
padding: 2px 8px;
border-radius: 2px;
border: 1px solid var(--border-highlight);
text-transform: uppercase;
```
