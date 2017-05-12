import { Gear } from './Gear';

export class GearConnection {

	other: Gear;
	ratio: number;
	forwardLock: boolean;
	backwardLock: boolean;
	inverted: boolean;

	constructor(other: Gear, ratio: number, inverted = true, forwardLock = true, backwardLock = true) {
		this.other = other;
		this.ratio = ratio;
		this.forwardLock = forwardLock;
		this.backwardLock = backwardLock;
		this.inverted = inverted;
	}

	getOther() {
		return this.other;
	}

	getRatio() {
		return this.ratio;
	}

	rotate(angle: number, nonce: string) {
		if (angle > 0 && this.forwardLock) {
			if (this.inverted)
				angle *= -1;
			this.other.rotate(angle * this.ratio, nonce);
		} else if (this.backwardLock) {
			if (this.inverted)
				angle *= -1;
			this.other.rotate(angle * this.ratio, nonce);
		}
	}

}
