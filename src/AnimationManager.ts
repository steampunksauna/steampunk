import * as Promise from 'bluebird';

import { Animation } from './Animation';

const enum Magic {
	fps = 30
}

export class AnimationManager {

	constructor() {
		this.startStamp = new Date().getTime();
		// Fire timer twice per frame to reduce jitter in frame number calculation.
		this.interval = window.setInterval(() => this.tick(), 1000 / Magic.fps / 2);
	}

	tick() {
		const stamp = new Date().getTime();
		const frame = Math.round((stamp - this.startStamp) / Magic.fps);

		// Check if frame number has changed yet.
		if(frame == this.frame) return;

		this.frame = frame;

		for(let animation of this.animationList) {
			animation.step(frame, stamp);
		}
	}

	animate(animation: Animation) {
		return(new Promise((resolve, reject) => {
			this.animationList.push(animation);
			animation.start(this.frame, new Date().getTime());
		}));
	}

	interval: number;
	startStamp: number;
	frame: number;

	animationList: Animation[] = [];

}
