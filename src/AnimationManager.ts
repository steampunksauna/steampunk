export class AnimationManager {

	constructor() {
		this.startStamp = new Date().getTime();
		this.interval = window.setInterval(() => this.tick(), 1000 / 25);
	}

	tick() {
		const stamp = new Date().getTime();

		console.log(stamp - this.startStamp);
	}

	interval: number;
	startStamp: number;

}
