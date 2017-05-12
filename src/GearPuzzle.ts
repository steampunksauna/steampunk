import { Cast } from './Scene';
import { Actor } from './Actor';
import { Gear } from './Gear';

export class GearPuzzle {

	gears: Gear[];
	moving = false;

	constructor() {
		let smallOffset = 56;
		let bigOffset = 102;
		this.gears = [
			new Gear('hourhand', 389, 798, 2, 2, this, undefined, 0, 'clockhands'),
			new Gear('minutehand', 389, 798, 1, 1, this, undefined, 0, 'clockhands'),
			new Gear('gear_small', 325, 575, smallOffset, smallOffset, this),
			new Gear('gear_small', 480, 730, smallOffset, smallOffset, this),
			new Gear('gear_small_arm', 280, 160, smallOffset, smallOffset, this, [0, 30, 60, 90, 120], -60),
		];
		this.gears[0].connect(this.gears[2], 2, true, false);
		this.gears[1].connect(this.gears[3], 2, true, false);
		this.gears[4].connect(this.gears[2], 1, true, false);
		this.gears[4].connect(this.gears[3], 1, true, false);
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
