/**
 * Soft nostalgic ambient audio generator using Web Audio API
 * Provides cozy warm vinyl crackle + dreamy warm pad chords without any external audio asset dependencies.
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private oscNodes: OscillatorNode[] = [];
  private chimeTimeout: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    try {
      this.initContext();
      if (!this.ctx) return;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 2.5);
      this.masterGain.connect(this.ctx.destination);

      // Create warm vinyl hiss/flutter buffer
      const bufferSize = this.ctx.sampleRate * 4; // 4 seconds looped
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brown noise filter for warm gentle tape hiss
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        // subtle vinyl pops
        if (Math.random() < 0.0008) {
          data[i] += (Math.random() - 0.5) * 0.15;
        }
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.value = 650; // cozy muffled warm tape feel

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.value = 0.07;

      this.noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      this.noiseNode.start();

      // Warm cinematic ambient chord (D - F# - A - C# - E / dreamy atmospheric chord)
      const chordFreqs = [146.83, 220.00, 277.18, 329.63, 440.00];
      this.oscNodes = [];

      chordFreqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.value = freq;

        // Soft subtle detune for warm analog chorus warmth
        osc.detune.value = (Math.random() - 0.5) * 8;

        oscGain.gain.value = 0.025 / chordFreqs.length;

        if (panner) {
          panner.pan.value = (idx / (chordFreqs.length - 1)) * 1.2 - 0.6;
          osc.connect(panner);
          panner.connect(oscGain);
        } else {
          osc.connect(oscGain);
        }

        oscGain.connect(this.masterGain);
        osc.start();
        this.oscNodes.push(osc);
      });

      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public playChapterChime() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();

      chimeOsc.type = 'sine';
      // Harmonic celestial chime frequency
      chimeOsc.frequency.setValueAtTime(587.33, now); // D5
      chimeOsc.frequency.exponentialRampToValueAtTime(880.0, now + 0.8); // A5

      chimeGain.gain.setValueAtTime(0.001, now);
      chimeGain.gain.linearRampToValueAtTime(0.04, now + 0.08);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.masterGain);

      chimeOsc.start(now);
      chimeOsc.stop(now + 2.0);
    } catch {
      // ignore
    }
  }

  public stop() {
    if (!this.isPlaying) return;
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      setTimeout(() => {
        try {
          this.noiseNode?.stop();
          this.noiseNode?.disconnect();
          this.oscNodes.forEach(o => {
            o.stop();
            o.disconnect();
          });
          this.oscNodes = [];
        } catch {
          // ignore
        }
      }, 1300);
    }
    this.isPlaying = false;
  }

  public getActiveState(): boolean {
    return this.isPlaying;
  }
}

export const ambientAudio = new AmbientSoundEngine();
