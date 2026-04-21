export class Engine {
  constructor(audioContext, state) {
    this.audioContext = audioContext;
    this.state = state;

    this.osc = this.audioContext.createOscillator();
    this.env = this.audioContext.createGain();
    this.osc.type = "sine";
    this.osc.connect(this.env);
    // this.env.connect(this.audioContext.destination);
    this.env.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.osc.start();

  }

  start() {
    this.stop();
    const now = this.audioContext.currentTime;

    // this.env.gain.cancelScheduledValues(now);
    // this.osc.frequency.cancelScheduledValues(now);

    this.env.gain.setValueAtTime(0, now + 0.05);
    this.env.gain.linearRampToValueAtTime(this.state.volume / 400, now + 0.15);

    this.osc.frequency.setValueAtTime(this.state.startFreq, now + 0.05);
    this.osc.frequency.linearRampToValueAtTime(this.state.endFreq, now + this.state.duration + 0.05);

  }

  stop() {
    const now = this.audioContext.currentTime;

    if (this.env.gain.value !== 0) {
      this.env.gain.setValueAtTime(this.state.volume / 400, now);
    }
    
    this.env.gain.linearRampToValueAtTime(0, now + 0.05);
    this.osc.frequency.cancelScheduledValues(now + 0.1);
    this.env.gain.cancelScheduledValues(now + 0.1);
  }

  connect(destination, input, output) {
    this.env.connect(destination, input, output);
  }

  disconnect() {
    this.env.disconnect();
  }
}