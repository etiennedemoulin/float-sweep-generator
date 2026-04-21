import { LitElement, html, render } from 'lit';

import resumeAudioContext from '../lib/resume-audio-context.js';

import './Generator.js';
import { Engine } from './Engine.js';

const audioContext = new AudioContext();

const states = [];
const numChannels = audioContext.destination.maxChannelCount;
console.log('> Num Channels:', numChannels);

audioContext.destination.channelCount = numChannels;
audioContext.destination.channelCountMode = "explicit";
audioContext.destination.channelInterpretation = 'discrete';

await resumeAudioContext(audioContext);

const merger = audioContext.createChannelMerger(numChannels);

merger.channelInterpretation = 'discrete';
merger.connect(audioContext.destination);

for (let i = 0; i < numChannels; i++) {
  states.push({
    id:i,
    startFreq:100.5,
    endFreq:600,
    duration:12,
    volume:40
  });
}

render(html`
  <h1>float-sweep-generator</h1>
  ${states.map(state => {
    const engine = new Engine(audioContext, state);
    engine.connect(merger, 0, state.id);
    return html`
      <sweep-gen .state=${state} .engine=${engine}></sweep-gen>
    `;
  })}
`, document.body);



