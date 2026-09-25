# NOISELESS-X6 WORKFLOWS
### Interactive Technical Architecture & Real-Time Acoustic Processing System

> **Standalone engineering visualization and deterministic signal-processing simulation for the NOISELESS-X6 project.**  
> *Dedicated strictly to explaining and visualizing the complete hardware, software, AI supervision, and closed-loop ANC architecture.*

---

## 1. Project Overview & Technical Mission

**NOISELESS-X6 WORKFLOWS** is an engineering visualization platform and real-time DSP simulator built for defense researchers, systems evaluators, acoustic engineers, and technical reviewers.

It translates the static architecture of the NOISELESS-X6 tactical dual-microphone adaptive speech enhancement system into an **interactive, living technical system**. The platform demonstrates the journey of acoustic signals: from raw ambient sound pressure fields through ADC discretization, STFT feature extraction, convolutional neural noise classification, Voice Activity Detection (VAD), AI adaptive supervision, hybrid filtered-x normalized least mean squares (FxLMS/NLMS) anti-noise generation, acoustic cancellation, to error microphone residual feedback.

### Strict 2D Engineering Visual Identity
In adherence to defense and laboratory instrument standards:
- **NO 3D Whatsoever**: Zero Three.js, WebGL 3D, Blender meshes, GLTF/GLB models, or pseudo-3D rotating cards.
- **Scientific 2D Schematics**: Precision SVG vector topologies, deterministic HTML5 Canvas 2D waveform oscillators, and high-density monospace telemetry consoles.
- **Semantic Military Palette**: Deep tactical olive, graphite substrate, and semantic signal accents:
  - `CYAN`: Reference audio $x[n]$, digital I2S streams, DSP processing.
  - `BLUE`: AI neural analysis, YAMNet latents, complex-spectral masks.
  - `GREEN`: Speech-protected VAD active, converged cancellation, normal operation.
  - `AMBER`: Impulsive shockwave transients, fast-clamp attack protection, soldier haptic trigger.
  - `RED`: Severe overruns or fault states.

---

## 2. Complete 22-Section Architectural Structure

The application features 22 dedicated engineering sections:

1. **`01 // SYSTEM OVERVIEW`** (`SystemHero.tsx`) — Large interactive central 2D system schematic illustrating the complete environment-to-feedback signal cycle with live waveform routing.
2. **`02 // COMPLETE WORKFLOW`** (`WorkflowMap.tsx`) — 19-stage end-to-end signal processing flow tracing signals from physical environment to coefficient adaptation.
3. **`03 // SOFTWARE ARCHITECTURE`** (`SoftwareArchitecture.tsx`) — Functional subsystem grouping: Input, Audio Processing, AI/ML, Decision, DSP Filtering, Output, and Feedback.
4. **`04 // HARDWARE ARCHITECTURE`** (`HardwareArchitecture.tsx`) — Clean 2D engineering wiring schematic showing audio codecs, AI-enabled SoC (Raspberry Pi 5 / Jetson), power rails (5V / 3.3V), class-D amplifiers, and speakers.
5. **`05 // AUDIO SENSING`** (`AudioSensing.tsx`) — 3-channel microphone ingestion visualization: Reference Mic (ambient noise), Primary Mic (noise + speech), and Boom Mic (clean communications).
6. **`06 // PREPROCESSING & FEATURE EXTRACTION`** (`PreprocessingPipeline.tsx`) — Stage-by-stage DSP pipeline: DC Removal, Pre-emphasis, Windowing, 512-pt STFT, Spectrogram synthesis, and Mel feature maps.
7. **`07 // AI/ML NOISE ANALYSIS`** (`AIAnalysis.tsx`) — Neural backbone visualization showcasing YAMNet convolutional embeddings, spectral patch tensors, and INT8 quantized inference.
8. **`08 // NOISE CLASSIFICATION`** (`NoiseClassifier.tsx`) — Interactive classifier toggling between Stationary, Non-Stationary, and Impulsive noise profiles with routing reconfigurations.
9. **`09 // SPEECH / VAD`** (`VADPanel.tsx`) — Voice Activity Detection engine comparing spectral energy and zero-crossing rates to assert speech protection flags.
10. **`10 // AI ADAPTIVE SUPERVISOR`** (`AdaptiveSupervisor.tsx`) — Finite State Machine (FSM) controller dynamically orchestrating step size ($\mu$), suppression depth, and algorithm selection across 5 operational states.
11. **`11 // HYBRID ANC`** (`HybridANC.tsx`) — Closed-loop acoustic cancellation topology displaying adaptive filtering, anti-noise generation, acoustic plant paths, and error feedback.
12. **`12 // FxLMS / NLMS CLOSED LOOP`** (`FxLMSLoop.tsx`) — Mathematical formulation of Filtered-x Least Mean Squares with secondary path $S(z)$ modeling and animated coefficient convergence bars.
13. **`13 // IMPULSIVE NOISE PROTECTION`** (`ImpulseProtection.tsx`) — Sub-millisecond transient detector with fast digital clamping, soldier haptic alert trigger, and smooth recovery envelopes.
14. **`14 // NEURAL SPEECH ENHANCEMENT`** (`SpeechEnhancement.tsx`) — DeepFilterNet2 residual speech post-filter demonstrating post-ANC speech clarity preservation (target latency $<20\text{ms}$).
15. **`15 // HARDWARE SIGNAL PATH`** (`HardwareSignalPath.tsx`) — Micro-level physical bus routing tracking digitized I2S frames, DMA ring buffers, and DAC voltage output.
16. **`16 // ERROR FEEDBACK`** (`ErrorFeedback.tsx`) — Error microphone $e[n]$ feedback minimization comparative oscillogram (Pre-cancellation vs Post-cancellation).
17. **`17 // END-TO-END LIVE SIMULATION`** (`SimulationLab.tsx`) — Interactive centerpiece laboratory featuring deterministic multi-source audio synthesis (Vehicle, Helicopter, Wind, Machinery, Crowd, Impulse) with 4-channel Canvas 2D oscilloscopes.
18. **`18 // SYSTEM STATES`** (`SystemStateMonitor.tsx`) — 13-stage sequential telemetry monitor highlighting real-time execution states.
19. **`19 // PERFORMANCE / ENGINEERING METRICS`** (`MetricsDashboard.tsx`) — Strict evidence audit displaying Model, Acoustic, and Runtime metrics tagged with `TARGET`, `PROTOTYPE MEASUREMENT`, or `NOT BENCHMARKED`.
20. **`20 // TECHNOLOGY STACK`** (`TechnologyStack.tsx`) — Comprehensive inventory of embedded platforms (Raspberry Pi 5, ARM NEON, ALSA), AI models, and real-time DSP libraries.
21. **`21 // FINAL SYSTEM ARCHITECTURE`** (`FinalArchitecture.tsx`) — The definitive master system map linking combat environments, parallel speech preservation, and tactical haptic alert paths.
22. **`22 // TECHNICAL FOOTER`** (`TechnicalFooter.tsx`) — Section anchors, telemetry status, and platform architecture declarations.

---

## 3. Strict Evidence Status Categorization

To guarantee scientific and engineering integrity, all performance data is tagged with its evidence source:
- **`TARGET`**: Theoretical architectural design objective (e.g., end-to-end latency $<15\text{ms}$, STOI $>0.88$).
- **`PROTOTYPE MEASUREMENT`**: Benchmarked hardware telemetry obtained on Raspberry Pi 5 / Jetson Nano testbeds (e.g., 94.2% classifier accuracy, +18.4 dB SNR improvement, 15.3% CPU load).
- **`ILLUSTRATIVE SIMULATION`**: Mathematical browser-side signals generated deterministically by the Canvas 2D engine.
- **`NOT BENCHMARKED`**: Transparently labeled when empirical field testing is pending (e.g., formal PESQ listening tests).

---

## 4. Deterministic Browser Simulation Architecture

The simulation engine (`src/simulation/SignalGenerator.ts`) executes mathematically grounded acoustic models in real-time:
- **Vehicle Engine**: Harmonics at $45\text{Hz}$, $110\text{Hz}$, and $220\text{Hz}$ mixed with low-frequency chassis vibration.
- **Helicopter Rotor**: $18\text{Hz}$ blade-pass frequency amplitude modulation over aerodynamic blade-tip turbulence.
- **Wind Turbulence**: Low-frequency pink-weighted chaotic airflow oscillations ($3.5\text{Hz} - 28\text{Hz}$).
- **Machinery**: Periodic mechanical impacts with exponential damping envelopes and $180\text{Hz}/540\text{Hz}$ industrial whines.
- **Impulse Shockwave**: Sub-millisecond ballistic pressure step with sharp exponential decay ($\tau \approx 60\text{ms}$).
- **Human Speech**: Formant synthesis combining vowel resonance peaks ($F_1 = 520\text{Hz}$, $F_2 = 1480\text{Hz}$, $F_3 = 2420\text{Hz}$) modulated by a $2.8\text{Hz}$ syllabic cadence.

---

## 5. Development & Build Instructions

### Prerequisites
- Node.js 18+ or 20+
- npm 9+ or pnpm

### Local Installation & Development
```bash
# Clone the repository
git clone https://github.com/raghul-cyber/noiseless-x6-workflow.git
cd noiseless-x6-workflow

# Install dependencies
npm install

# Start local development server with Vite HMR
npm run dev
```

### Production Build & Typecheck
```bash
# Type check and build optimized static assets
npm run build

# Preview the production build locally
npm run preview
```

---

## 6. Project File Structure

```
noiseless-x6-workflow/
├── public/                 # Static assets & SVG icons
├── src/
│   ├── components/         # 22 Standalone Engineering UI Subsystems
│   │   ├── TechnicalNav.tsx
│   │   ├── SystemHero.tsx
│   │   ├── WorkflowMap.tsx
│   │   ├── SoftwareArchitecture.tsx
│   │   ├── HardwareArchitecture.tsx
│   │   ├── AudioSensing.tsx
│   │   ├── PreprocessingPipeline.tsx
│   │   ├── AIAnalysis.tsx
│   │   ├── NoiseClassifier.tsx
│   │   ├── VADPanel.tsx
│   │   ├── AdaptiveSupervisor.tsx
│   │   ├── HybridANC.tsx
│   │   ├── FxLMSLoop.tsx
│   │   ├── ImpulseProtection.tsx
│   │   ├── SpeechEnhancement.tsx
│   │   ├── HardwareSignalPath.tsx
│   │   ├── ErrorFeedback.tsx
│   │   ├── SimulationLab.tsx
│   │   ├── SystemStateMonitor.tsx
│   │   ├── MetricsDashboard.tsx
│   │   ├── TechnologyStack.tsx
│   │   ├── FinalArchitecture.tsx
│   │   ├── TechnicalFooter.tsx
│   │   └── ComponentDetailDrawer.tsx
│   ├── diagrams/           # Component metadata, pinouts, & signal schema
│   │   └── architectureData.ts
│   ├── simulation/         # Deterministic mathematical acoustic oscillators
│   │   ├── SignalGenerator.ts
│   │   ├── SimulationState.ts
│   │   └── STFTSimulation.ts
│   ├── styles/             # Defense color tokens, line styles, animations
│   │   ├── tokens.css
│   │   ├── technical.css
│   │   └── animations.css
│   ├── App.tsx             # Root orchestration & shared state machine
│   ├── index.css           # Global substrate styling
│   └── main.tsx            # React root mount
├── DESIGN.md               # DESIGN.md-compatible architectural specification
├── index.html              # HTML shell with Google Fonts & metadata
├── package.json            # Project manifest
└── vite.config.ts          # Vite build configuration
```

---

## 7. License & Attribution

Designed and engineered for the **NOISELESS-X6** technical architecture initiative.  
*All architecture specifications, DSP algorithms, and hardware schematics reflect the official NOISELESS-X6 research baseline.*
