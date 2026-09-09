// Procedural Web Audio FX Synthesizer (no external assets)
export const SoundEngine = {
  ctx: null as AudioContext | null,
  enabled: false,

  init() {
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (Ctor) this.ctx = new Ctor();
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  },

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) this.init();
    return this.enabled;
  },

  playClick() {
    if (!this.enabled || !this.ctx) return;
    this.tone(800, 300, 0.04, 0.08, 'sine');
  },
  playWhoosh() {
    if (!this.enabled || !this.ctx) return;
    this.tone(140, 420, 0.15, 0.07, 'triangle');
  },
  playBlip(pitch = 520) {
    if (!this.enabled || !this.ctx) return;
    this.tone(pitch, pitch * 1.5, 0.08, 0.06, 'sine');
  },

  tone(from: number, to: number, dur: number, vol: number, type: OscillatorType) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(from, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(to, ctx.currentTime + dur);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  },
};
