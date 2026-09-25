import { NoiseType } from './SimulationState';

export interface SignalSample {
  noiseVal: number;
  speechVal: number;
  primaryVal: number;
  referenceVal: number;
  antiNoiseVal: number;
  residualVal: number;
}

export class SignalGenerator {
  private time: number = 0;
  private impulseTime: number = -1;

  public triggerImpulse(): void {
    this.impulseTime = this.time;
  }

  public getSample(
    dt: number,
    noiseType: NoiseType,
    speechEnabled: boolean,
    ancActive: boolean,
    attenuationDb: number
  ): SignalSample {
    this.time += dt;
    const t = this.time;

    // 1. Generate Noise Signal based on physical acoustics
    let noise = 0;
    switch (noiseType) {
      case 'vehicle':
        // Continuous engine harmonics + low frequency rumble
        noise =
          0.45 * Math.sin(2 * Math.PI * 45 * t) +
          0.30 * Math.sin(2 * Math.PI * 110 * t + 0.3) +
          0.15 * Math.sin(2 * Math.PI * 220 * t + 1.1) +
          0.10 * (Math.sin(340 * t) * Math.cos(70 * t));
        break;

      case 'helicopter':
        // Rotor blade-pass modulation (18 Hz blade-rate) with turbulent aerodynamic wash
        const rotorModulation = 0.5 + 0.5 * Math.sin(2 * Math.PI * 18 * t);
        noise =
          rotorModulation *
          (0.6 * Math.sin(2 * Math.PI * 95 * t) + 0.3 * Math.sin(2 * Math.PI * 190 * t + 0.4)) +
          0.2 * Math.sin(2 * Math.PI * 34 * t);
        break;

      case 'wind':
        // Low-frequency broadband aerodynamic turbulent gusts
        noise =
          0.5 * Math.sin(2 * Math.PI * 12 * t) * Math.sin(2 * Math.PI * 3.5 * t) +
          0.3 * Math.sin(2 * Math.PI * 28 * t + 0.7) +
          0.2 * Math.sin(2 * Math.PI * 65 * t);
        break;

      case 'machinery':
        // Hard mechanical cyclic percussion & industrial whining
        const stroke = (t * 4) % 1;
        const impact = stroke < 0.15 ? Math.exp(-stroke * 25) * Math.sin(2 * Math.PI * 300 * stroke) : 0;
        noise = 0.4 * Math.sin(2 * Math.PI * 180 * t) + 0.25 * Math.sin(2 * Math.PI * 540 * t) + 0.35 * impact;
        break;

      case 'crowd':
        // Babble noise with irregular mid-frequency multi-talker interference
        noise =
          0.25 * Math.sin(2 * Math.PI * 320 * t) +
          0.25 * Math.sin(2 * Math.PI * 480 * t + 1.2) +
          0.20 * Math.sin(2 * Math.PI * 720 * t + 2.1) +
          0.15 * Math.sin(2 * Math.PI * 1100 * t + 0.5);
        break;

      case 'impulse':
        // Sudden explosive shockwave transient
        const timeSinceImpulse = this.impulseTime >= 0 ? t - this.impulseTime : 999;
        if (timeSinceImpulse >= 0 && timeSinceImpulse < 0.35) {
          const envelope = Math.exp(-timeSinceImpulse / 0.06);
          noise = 1.35 * envelope * Math.sin(2 * Math.PI * 280 * timeSinceImpulse);
        } else {
          // Low background ambient residual between shots
          noise = 0.12 * Math.sin(2 * Math.PI * 60 * t);
        }
        break;
    }

    // 2. Speech Signal (Formant synthesis with syllabic rhythm: 3 Hz envelope)
    let speech = 0;
    if (speechEnabled) {
      const syllableCadence = Math.max(0, Math.sin(2 * Math.PI * 2.8 * t));
      if (syllableCadence > 0.1) {
        // Formant combination: F1 (500Hz), F2 (1500Hz), F3 (2500Hz)
        const formant1 = 0.5 * Math.sin(2 * Math.PI * 520 * t);
        const formant2 = 0.3 * Math.sin(2 * Math.PI * 1480 * t);
        const formant3 = 0.2 * Math.sin(2 * Math.PI * 2420 * t);
        speech = syllableCadence * (formant1 + formant2 + formant3);
      }
    }

    // 3. Acoustic paths:
    // Reference mic captures surrounding environmental noise d[n]
    const referenceVal = noise;

    // Primary mic captures desired speech s[n] + ambient noise v[n] (attenuated slightly by headphone shell)
    const primaryVal = speech + 0.85 * noise;

    // Secondary path anti-noise generation y[n]
    let antiNoiseVal = 0;
    let residualVal = primaryVal;

    if (ancActive) {
      // Inversion with slight acoustic phase delay and finite cancellation ratio
      const cancelFactor = Math.pow(10, attenuationDb / 20); // e.g. -20 dB -> ~0.1 residual
      antiNoiseVal = -0.85 * noise * (1 - cancelFactor);
      residualVal = speech + 0.85 * noise * cancelFactor;
    }

    return {
      noiseVal: noise,
      speechVal: speech,
      primaryVal,
      referenceVal,
      antiNoiseVal,
      residualVal
    };
  }
}
