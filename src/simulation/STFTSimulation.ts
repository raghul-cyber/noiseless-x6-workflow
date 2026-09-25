import { NoiseType } from './SimulationState';

export interface SpectralBin {
  freqHz: number;
  label: string;
  magnitude: number;
  phase: number;
}

export class STFTSimulation {
  public static generateSpectrogramColumn(
    time: number,
    noiseType: NoiseType,
    speechActive: boolean
  ): SpectralBin[] {
    const bins: SpectralBin[] = [
      { freqHz: 60, label: '60 Hz', magnitude: 0.1, phase: 0 },
      { freqHz: 120, label: '120 Hz', magnitude: 0.1, phase: 0 },
      { freqHz: 250, label: '250 Hz', magnitude: 0.1, phase: 0 },
      { freqHz: 500, label: '500 Hz', magnitude: 0.1, phase: 0 },
      { freqHz: 1000, label: '1.0 kHz', magnitude: 0.1, phase: 0 },
      { freqHz: 2000, label: '2.0 kHz', magnitude: 0.1, phase: 0 },
      { freqHz: 4000, label: '4.0 kHz', magnitude: 0.1, phase: 0 },
      { freqHz: 8000, label: '8.0 kHz', magnitude: 0.1, phase: 0 }
    ];

    // Determine deterministic spectral distribution
    switch (noiseType) {
      case 'vehicle':
        bins[0].magnitude = 0.92; // 60 Hz high
        bins[1].magnitude = 0.78; // 120 Hz high
        bins[2].magnitude = 0.54; // 250 Hz mid
        bins[3].magnitude = 0.31;
        bins[4].magnitude = 0.18;
        bins[5].magnitude = 0.09;
        bins[6].magnitude = 0.05;
        bins[7].magnitude = 0.02;
        break;

      case 'helicopter':
        // Blade-rate harmonic peaks
        const bladePhase = Math.sin(time * 6.28 * 18);
        bins[0].magnitude = 0.85 + 0.1 * bladePhase;
        bins[1].magnitude = 0.88 + 0.1 * bladePhase;
        bins[2].magnitude = 0.65;
        bins[3].magnitude = 0.42;
        bins[4].magnitude = 0.25;
        bins[5].magnitude = 0.15;
        bins[6].magnitude = 0.08;
        bins[7].magnitude = 0.04;
        break;

      case 'wind':
        bins[0].magnitude = 0.95;
        bins[1].magnitude = 0.65;
        bins[2].magnitude = 0.35;
        bins[3].magnitude = 0.20;
        bins[4].magnitude = 0.12;
        bins[5].magnitude = 0.08;
        bins[6].magnitude = 0.04;
        bins[7].magnitude = 0.01;
        break;

      case 'machinery':
        bins[0].magnitude = 0.40;
        bins[1].magnitude = 0.75;
        bins[2].magnitude = 0.85;
        bins[3].magnitude = 0.70;
        bins[4].magnitude = 0.45;
        bins[5].magnitude = 0.25;
        bins[6].magnitude = 0.10;
        bins[7].magnitude = 0.05;
        break;

      case 'crowd':
        bins[0].magnitude = 0.20;
        bins[1].magnitude = 0.35;
        bins[2].magnitude = 0.65;
        bins[3].magnitude = 0.80;
        bins[4].magnitude = 0.75;
        bins[5].magnitude = 0.50;
        bins[6].magnitude = 0.30;
        bins[7].magnitude = 0.15;
        break;

      case 'impulse':
        // Broadband shock across all frequencies
        const impulseMagnitude = 0.95;
        bins.forEach((b) => (b.magnitude = impulseMagnitude));
        break;
    }

    // Add speech formants (typically 300Hz - 3400Hz) if speech is active
    if (speechActive) {
      bins[2].magnitude = Math.min(1.0, bins[2].magnitude + 0.35); // 250 Hz
      bins[3].magnitude = Math.min(1.0, bins[3].magnitude + 0.60); // 500 Hz
      bins[4].magnitude = Math.min(1.0, bins[4].magnitude + 0.55); // 1 kHz
      bins[5].magnitude = Math.min(1.0, bins[5].magnitude + 0.40); // 2 kHz
    }

    return bins;
  }
}
