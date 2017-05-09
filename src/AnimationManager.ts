export class AnimationManager {

	fps: 30;

	constructor() {
		this.startStamp = new Date().getTime();
		this.interval = window.setInterval(() => this.tick(), 1000 / this.fps);
	}

	tick() {
		const stamp = new Date().getTime();

		console.log(stamp - this.startStamp);
	}

	interval: number;
	startStamp: number;

}
