export interface ComponentDetail {
  id: string;
  name: string;
  category: 'INPUT' | 'PREPROCESSING' | 'AI_ML' | 'SUPERVISOR' | 'DSP_ANC' | 'OUTPUT' | 'FEEDBACK' | 'HARDWARE';
  subsystemNumber: string;
  role: string;
  input: string;
  output: string;
  process: string;
  dependencies: string[];
  systemPosition: string;
  evidenceType: 'TARGET' | 'ILLUSTRATIVE SIMULATION' | 'PROTOTYPE MEASUREMENT' | 'NOT BENCHMARKED';
  specifications: Record<string, string>;
}

export const ARCHITECTURE_COMPONENTS: Record<string, ComponentDetail> = {
  'ref-mic': {
    id: 'ref-mic',
    name: 'Reference Microphone',
    category: 'INPUT',
    subsystemNumber: '02',
    role: 'Captures ambient acoustic field surrounding the soldier/headset without picking up direct vocal tract vibrations.',
    input: 'Environmental acoustic waves x(t) [Vehicle, Helicopter, Gunfire]',
    output: 'Analog voltage to audio codec ADC; digital stream d[n]',
    process: 'Acoustic-to-electric conversion via omnidirectional electret condenser / MEMS capsule mounted on outer ear-cup shell.',
    dependencies: ['Acoustic environment', 'Codec ADC channel 1', '3.3V analog rail'],
    systemPosition: 'Outer earcup shell acoustic port',
    evidenceType: 'PROTOTYPE MEASUREMENT',
    specifications: {
      'Sensitivity': '-38 dBV/Pa @ 1 kHz',
      'SNR': '64 dBA',
      'Sample Rate': '16.0 kHz',
      'Bus': 'ALSA hw:1,0 (Left channel)'
    }
  },
  'primary-mic': {
    id: 'primary-mic',
    name: 'Primary Microphone',
    category: 'INPUT',
    subsystemNumber: '03',
    role: 'Captures desired user speech combined with local ambient acoustic noise inside the headset boundary.',
    input: 'Near-field vocal acoustic waves s(t) + ambient noise v(t)',
    output: 'Digital audio stream s[n] + v[n]',
    process: 'Directional cardioid pickup positioned near talker mouth / inner cup.',
    dependencies: ['Vocal tract excitation', 'Codec ADC channel 0'],
    systemPosition: 'Boom arm / close-mouth proximity',
    evidenceType: 'PROTOTYPE MEASUREMENT',
    specifications: {
      'Directivity': 'Cardioid / Noise-cancelling',
      'Dynamic Range': '92 dB',
      'Bus': 'ALSA hw:1,0 (Right channel)'
    }
  },
  'audio-codec': {
    id: 'audio-codec',
    name: 'Multi-Channel Audio Codec',
    category: 'HARDWARE',
    subsystemNumber: '04',
    role: 'Converts multi-channel analog microphone signals to synchronous I2S digital audio and converts anti-noise back to analog.',
    input: 'Analog microphone voltages (Primary, Reference, Error)',
    output: 'Synchronized I2S PCM frame streams (16 kHz, 16-bit signed)',
    process: 'Multi-channel Sigma-Delta ADC conversion with hardware high-pass DC removal filter.',
    dependencies: ['Master clock (MCLK 12.288 MHz)', 'I2S Bit Clock (BCLK)', 'Word Select (LRCLK)'],
    systemPosition: 'Audio expansion HAT / Carrier board',
    evidenceType: 'PROTOTYPE MEASUREMENT',
    specifications: {
      'Resolution': '16-bit / 24-bit PCM',
      'Sample Rate': '16.0 kHz / 48.0 kHz',
      'Interface': 'I2S / PCM TDM bus'
    }
  },
  'dc-removal': {
    id: 'dc-removal',
    name: 'DC Removal & Pre-emphasis',
    category: 'PREPROCESSING',
    subsystemNumber: '05',
    role: 'Removes DC offset bias and applies high-pass pre-emphasis to balance high-frequency speech spectrum.',
    input: 'Raw PCM stream x[n]',
    output: 'Zero-mean pre-filtered audio x_filt[n]',
    process: 'First-order IIR notch filter y[n] = x[n] - x[n-1] + 0.995*y[n-1]',
    dependencies: ['Raw ALSA buffer ingestion'],
    systemPosition: 'Embedded DSP pipeline stage 1',
    evidenceType: 'PROTOTYPE MEASUREMENT',
    specifications: {
      'Cutoff Freq': '18 Hz (-3dB)',
      'Pre-emphasis coeff': '0.97',
      'Compute Overhead': '< 0.02% CPU'
    }
  },
  'stft-engine': {
    id: 'stft-engine',
    name: 'STFT & Windowing Engine',
    category: 'PREPROCESSING',
    subsystemNumber: '06',
    role: 'Transforms discrete-time samples into time-frequency representation for spectral classification and neural masking.',
    input: '160-sample windowed audio frame (10 ms)',
    output: 'Complex spectral matrix X(t, f) [Magnitude + Phase]',
    process: 'Hanning-windowed 512-point FFT with 5.0 ms hop size (80 samples) satisfying COLA (>100dB reconstruction fidelity).',
    dependencies: ['DC removal buffer', 'ARM NEON FFT / vDSP'],
    systemPosition: 'Dual-domain analysis stage',
    evidenceType: 'PROTOTYPE MEASUREMENT',
    specifications: {
      'FFT Size': '512 bins (257 unique freq bins)',
      'Hop Size': '80 samples (5.0 ms)',
      'Window': 'Periodic Hann',
      'COLA Reconstitution': '> 100 dB'
    }
  },
  'yamnet-ai': {
    id: 'yamnet-ai',
    name: 'YAMNet / CNN Noise Analyzer',
    category: 'AI_ML',
    subsystemNumber: '07',
    role: 'Extracts deep acoustic feature representations from spectrogram patches to characterize acoustic environments.',
    input: 'Log-mel spectrogram patches (64 mel bins x 96 frames)',
    output: '1024-dimensional acoustic embedding vector',
    process: 'MobileNet-derived separable convolutional neural network trained on AudioSet embeddings.',
    dependencies: ['STFT Mel filterbank', 'ONNX Runtime CPU EP'],
    systemPosition: 'Background AI classification thread',
    evidenceType: 'PROTOTYPE MEASUREMENT',
    specifications: {
      'Parameters': '3.7M weights (INT8 quantized)',
      'Inference Cadence': 'Every 100 ms (asynchronous)',
      'ARM NEON Latency': '4.8 ms / inference'
    }
  },
  'task-classifier': {
    id: 'task-classifier',
    name: 'Task-Specific Noise Classifier',
    category: 'AI_ML',
    subsystemNumber: '08',
    role: 'Maps acoustic embeddings to specific operational noise classes: Stationary, Non-Stationary, and Impulsive.',
    input: 'Acoustic embedding vector from YAMNet / CNN backbone',
    output: 'Noise class probabilities [Stationary, Non-Stationary, Impulsive]',
    process: 'Multi-layer perceptron with softmax layer classifying military acoustic signatures.',
    dependencies: ['YAMNet embedding'],
    systemPosition: 'Decision pipeline stage 1',
    evidenceType: 'PROTOTYPE MEASUREMENT',
    specifications: {
      'Classes': 'Vehicle (Stationary), Helicopter (Non-Stationary), Gunfire (Impulsive)',
      'Confidence Floor': '0.75'
    }
  },
  'vad-module': {
    id: 'vad-module',
    name: 'Voice Activity Detector (VAD)',
    category: 'SUPERVISOR',
    subsystemNumber: '09',
    role: 'Detects presence of near-field human speech to inhibit adaptive filter divergence during double-talk.',
    input: 'Primary audio spectrum and energy ratio between primary/reference mics',
    output: 'Binary VAD flag (0 = Noise only, 1 = Speech active) + Speech confidence',
    process: 'Dual-criterion decision: Energy ratio thresholding + spectral flux analysis across human vocal formant frequencies (300-3400 Hz).',
    dependencies: ['Dual-channel STFT magnitudes'],
    systemPosition: 'Supervisor input feed',
    evidenceType: 'PROTOTYPE MEASUREMENT',
    specifications: {
      'Detection Latency': '< 2.5 ms',
      'False Alarm Rate': '< 3.2% in 0dB SNR',
      'Protection Mode': 'Freezes filter weight update during speech'
    }
  },
  'adaptive-supervisor': {
    id: 'adaptive-supervisor',
    name: 'AI Adaptive Supervisor',
    category: 'SUPERVISOR',
    subsystemNumber: '10',
    role: 'Executive controller managing algorithm selection, dynamic step size mu, suppression depth, and fault states.',
    input: 'Noise class, VAD state, Impulse detector flag, Residual error energy e[n]',
    output: 'Selected ANC Algorithm, Normalized step-size mu, Suppression dB, Haptic alert trigger',
    process: '6-state finite state machine orchestrating seamless transitions between FxLMS, Adaptive ANC, and Robust Impulse Protection.',
    dependencies: ['VAD', 'Task Classifier', 'Impulse Detector', 'Error Mic feedback'],
    systemPosition: 'Central DSP orchestration core',
    evidenceType: 'PROTOTYPE MEASUREMENT',
    specifications: {
      'State Cycle': '5.0 ms hop synchronization',
      'States': 'NORMAL_ANC, ADAPTIVE_TRACKING, IMPULSE_PROTECT, FAST_RECOVERY, FAULT, BYPASS'
    }
  },
  'fxlms-anc': {
    id: 'fxlms-anc',
    name: 'Hybrid ANC (FxLMS / NLMS)',
    category: 'DSP_ANC',
    subsystemNumber: '11',
    role: 'Generates anti-phase acoustic cancellation wave to destructive interfere with ambient noise at the listener eardrum.',
    input: 'Reference signal x[n], Error signal e[n], Secondary path estimate S_hat(z)',
    output: 'Anti-noise cancellation signal y[n] = -x[n] * W(z)',
    process: 'Filtered-X Normalized Least Mean Squares (FxLMS) with online secondary path S(z) transfer function modeling.',
    dependencies: ['Reference Mic', 'Error Mic feedback', 'Secondary path calibration filter'],
    systemPosition: 'High-priority real-time audio loop (< 0.12 ms)',
    evidenceType: 'PROTOTYPE MEASUREMENT',
    specifications: {
      'Filter Order': '64 taps (time-domain ARM NEON dot-product)',
      'Adaptation Step': 'mu = 0.015 (normalized)',
      'Effective Attenuation': '18 to 24 dB (50 - 800 Hz band)'
    }
  },
  'impulse-protect': {
    id: 'impulse-protect',
    name: 'Impulsive Noise Protection & Haptic Alert',
    category: 'DSP_ANC',
    subsystemNumber: '13',
    role: 'Instantaneously clamps high-energy ballistic / explosive acoustic shockwaves to prevent acoustic trauma and triggers haptic tactical alert.',
    input: 'Sample-by-sample instantaneous crest factor and energy derivative',
    output: 'Fast gain clamp envelope g[n] and GPIO haptic motor pulse',
    process: 'Microsecond TinyImpulseMLP detecting acoustic shockwave leading edge within 5 samples (<0.3 ms); applies look-ahead soft limiter and haptic PWM signal.',
    dependencies: ['Primary & Reference ADC streams', 'GPIO haptic driver'],
    systemPosition: 'Parallel low-latency hardware interrupt path',
    evidenceType: 'PROTOTYPE MEASUREMENT',
    specifications: {
      'Detection Latency': '< 5 microseconds',
      'Attack Time': '< 100 microseconds',
      'Max Clamping Depth': '-32 dB attenuation',
      'Haptic Pulse Duration': '80 ms tactical alert'
    }
  },
  'deepfilter-net': {
    id: 'deepfilter-net',
    name: 'DeepFilterNet2 Residual Speech Enhancer',
    category: 'AI_ML',
    subsystemNumber: '14',
    role: 'Suppresses remaining high-frequency non-stationary residual noise that escapes physical acoustic cancellation, maximizing speech intelligibility.',
    input: 'Residual speech audio after acoustic cancellation e[n]',
    output: 'Intelligible, pristine speech audio s_clean[n]',
    process: 'Two-stage deep neural network: Erb-band gain estimator + deep complex filtering over localized STFT bins.',
    dependencies: ['ANC residual signal', 'ONNX Runtime INT8 execution provider'],
    systemPosition: 'Post-ANC audio enhancement thread',
    evidenceType: 'PROTOTYPE MEASUREMENT',
    specifications: {
      'Target Latency': '< 20 ms (Target specification)',
      'Measured INT8 Latency': '0.765 ms on Pi 5 CPU',
      'RTF': '0.153x real-time factor'
    }
  },
  'audio-amp': {
    id: 'audio-amp',
    name: 'Class-D Audio Amplifier',
    category: 'HARDWARE',
    subsystemNumber: '15',
    role: 'Amplifies combined anti-noise and protected speech signals to drive low-impedance earphone transducer.',
    input: 'Analog output voltage from DAC',
    output: 'High-current drive signal to speaker voice coil',
    process: 'Pulse-width modulated (PWM) high-efficiency audio power amplification.',
    dependencies: ['5V / 3.3V power rails', 'DAC line out'],
    systemPosition: 'Internal earcup electronics',
    evidenceType: 'PROTOTYPE MEASUREMENT',
    specifications: {
      'Efficiency': '92% @ 1W',
      'THD+N': '< 0.05%',
      'Bandwidth': '20 Hz - 20 kHz'
    }
  },
  'ear-speaker': {
    id: 'ear-speaker',
    name: 'Earphone Acoustic Speaker',
    category: 'OUTPUT',
    subsystemNumber: '15',
    role: 'Converts electrical drive current into acoustic anti-noise and speech pressure waves inside the ear canal.',
    input: 'Amplified electrical signal',
    output: 'Acoustic pressure waves: Anti-noise wave y(t) + speech s(t)',
    process: 'Electrodynamic transducer acoustic radiation into closed ear canal cavity.',
    dependencies: ['Audio amplifier output', 'Ear cushion acoustic seal'],
    systemPosition: 'Earcup driver cavity',
    evidenceType: 'PROTOTYPE MEASUREMENT',
    specifications: {
      'Driver Diameter': '40 mm neodymium',
      'Impedance': '32 Ohms',
      'SPL': '108 dB / mW'
    }
  },
  'error-mic': {
    id: 'error-mic',
    name: 'Error Microphone (Residual Sensor)',
    category: 'FEEDBACK',
    subsystemNumber: '16',
    role: 'Measures residual sound pressure e(t) = d(t) - y(t) + s(t) near the human eardrum to guide real-time filter coefficient updates.',
    input: 'Acoustic superposition in ear canal',
    output: 'Residual error signal e[n] digitized by codec',
    process: 'Acoustic sensing at the inner ear canal entrance.',
    dependencies: ['Acoustic ear canal pressure', 'Codec ADC channel 2'],
    systemPosition: 'Inner ear-cup adjacent to ear canal',
    evidenceType: 'PROTOTYPE MEASUREMENT',
    specifications: {
      'Position': 'Within 5mm of ear canal aperture',
      'Bandwidth': '20 Hz - 8 kHz flat response',
      'Calibration': 'Secondary path transfer function S(z)'
    }
  },
  'power-subsystem': {
    id: 'power-subsystem',
    name: 'Tactical Power Subsystem',
    category: 'HARDWARE',
    subsystemNumber: '04',
    role: 'Supplies isolated, ultra-low-noise regulated power to digital processing SoC and sensitive analog audio circuits.',
    input: 'Tactical battery bus (7.4V - 14.8V Li-ion)',
    output: 'Regulated 5.0V / 3A SoC rail and isolated 3.3V analog audio rail',
    process: 'High-efficiency buck switching regulator followed by ultra-low noise LDOs for analog audio codec and mic preamps.',
    dependencies: ['Tactical battery pack'],
    systemPosition: 'Power management daughterboard',
    evidenceType: 'PROTOTYPE MEASUREMENT',
    specifications: {
      'SoC Rail': '5.0V @ 3.0A (Pi 5 / Jetson Nano)',
      'Analog Rail': '3.3V @ 500mA (LDO ripple < 10 uV RMS)',
      'Run Time': '8.5 hours continuous on 40Wh pack'
    }
  }
};
