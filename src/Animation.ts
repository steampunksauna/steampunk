export class Animation {

	start(frame: number, stamp: number) {
		this.startFrame = frame;
		this.startStamp = stamp;
	}

	step(globalFrame: number, stamp: number) {
		const frame = globalFrame - this.startFrame;
	}

	startFrame: number;
	startStamp: number;

}
