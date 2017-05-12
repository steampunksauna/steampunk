import { Cast } from './Scene';
import { Actor } from './Actor';
import { Gear } from './Gear';

export class GearPuzzle {

	gears: Gear[];
	moving = false;

	constructor() {
		this.gears = [
			new Gear('hourhand', 389, 798, 2, 2, this, undefined, 'clockhands'),
			new Gear('minutehand', 389, 798, 1, 1, this, undefined, 'clockhands'),
			new Gear('gear_small', 100, 100, 56, 56, this, [0, 30, 60, 90]),
			new Gear('gear_big', 155, 165, 102, 102, this),
			new Gear('gear_small_arm', 300, 100, 56, 56, this),
			new Gear('gear_big', 355, 565, 102, 102, this),
		];
		this.gears[2].connect(this.gears[3], 0.5, true, false);
		this.gears[3].connect(this.gears[4], 2, false);
		this.gears[2].connect(this.gears[0], 1, true, true);
		this.gears[2].connect(this.gears[1], 1, true, false);
		this.gears[5].connect(this.gears[1], 1, true, false);
	}

	getGears() {
		return this.gears;
	}

	getCasts() {
		let result: Cast[];
		result = [];
		this.gears.forEach(function (element) {
			result.push(element.getCast());
		});
		return result;
	}

	checkSolution() {
		let hourhand = this.gears[0].angle;
		hourhand %= 360;
		if (hourhand < 0)
			hourhand += 360;
		let minutehand = this.gears[1].angle;
		minutehand %= 360;
		if (minutehand < 0)
			minutehand += 360;
		console.log("Combination:", hourhand, minutehand);
	}

	isMoving() { return this.moving; }
	setMoving(moving: boolean) { this.moving = moving; }
}
