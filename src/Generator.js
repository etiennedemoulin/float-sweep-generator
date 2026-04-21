import { LitElement, html, css } from 'lit';

import '@ircam/sc-components';

class Generator extends LitElement {
	static styles = css`
	    :host {
	      display: block;
	      width: inherit;
	      height: inherit;
	    }

	    header {
	      display: block;
	      height: 70px;
	      line-height: 70px;
	      background-color: var(--sw-medium-background-color);
	      display: flex;
	      flex-direction: row;
	      justify-content: space-between;
	      align-items: stretch;
	      border-bottom: 1px solid var(--sw-lighter-background-color);
	    }

	    p {
	      font-size: 30px;
	      margin: 4px;
	      height: 30px;
	      line-height: 30px;
	      text-indent: 0px;
	      background-color: #454545;
	    }

	    .separator {
	    	height: 100px;
	    }

	    sc-number {
	    	width: 125px;
	    	margin: 4px;
	    }

	    sc-text {
	    	width: 125px;
	    	margin: 4px;
	    }

	    sc-button {
	    	width: 125px;
	    	margin: 4px;
	    }

	    .first {
	    	width: 264px;
	    }

	`;

	constructor() {
		super();
		this.state = null;
		this.engine = null;
	};

	render() {
		return html`
			<div>
				<sc-text class="first" value="Electroaimant #${this.state.id + 1}"></sc-text>
			  	<sc-text value="Start frequency"></sc-text>
				<sc-text value="End frequency"></sc-text>
				<sc-text value="Duration"></sc-text>
				<sc-text value="Volume"></sc-text>
			</div>
			<div>
				<sc-button
					value="Play"
					@input=${e => this.engine.start()}
				></sc-button>
				<sc-button
					value="Stop"
					@input=${e => this.engine.stop()}
				></sc-button>
			  	<sc-number
					min=0
					value=${this.state.startFreq}
					?integer=false
					@input=${e => this.state.startFreq = e.detail.value}
				></sc-number>
			  	<sc-number
					min=0
					value=${this.state.endFreq}
					?integer=false
					@input=${e => this.state.endFreq = e.detail.value}
				></sc-number>
			  	<sc-number
					min=0
					value=${this.state.duration}
					?integer=false
					@input=${e => this.state.duration = e.detail.value}
				></sc-number>
				<sc-number
					min=0
					max=100
					value=${this.state.volume}
					?integer=false
					@input=${e => this.state.volume = e.detail.value}
				></sc-number>
			</div>
			<div class="separator"></div>
		`;
	}

}


customElements.define('sweep-gen', Generator);