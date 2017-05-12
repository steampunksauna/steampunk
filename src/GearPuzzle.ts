import { Cast } from './Scene';
import { Actor } from './Actor';
import { Gear } from './Gear';
import { audiomanager } from './AudioManager';

export class GearPuzzle {

	gears: Gear[];
	moving = false;

	constructor() {
		audiomanager.createAudio('test', 'khatchonk');
		let smallOffset = 56;
		let bigOffset = 102;
		this.gears = [
		/*	0 */	new Gear('hourhand', 389, 798, 2, 2, this, 135, undefined, 'clockhands'),
		/*	1 */	new Gear('minutehand', 389, 798, 1, 1, this, 30, undefined, 'clockhands'),
		/*	2 */	new Gear('gear_small', 325, 575, smallOffset, smallOffset, this),
		/*	3 */	new Gear('gear_small', 480, 730, smallOffset, smallOffset, this),
		/*	4 */	new Gear('gear_big', 290, 250, bigOffset, bigOffset, this),
		/*	5 */	new Gear('gear_big', 380, 250, bigOffset, bigOffset, this),
		/*	6 */	new Gear('gear_small', 680, 265, smallOffset, smallOffset, this, 15),
		/*	7 */	new Gear('gear_big', 725, 335, bigOffset, bigOffset, this, 10),
		/*	8 */	new Gear('gear_small', 880, 265, smallOffset, smallOffset, this, 15),
		/*	9 */	new Gear('gear_big', 835, 215, bigOffset, bigOffset, this),
		/*	10 */	new Gear('gear_big', 580, 690, bigOffset, bigOffset, this),
		/*	11 */	new Gear('gear_small', 415, 520, smallOffset, smallOffset, this),
		/*	12 */	new Gear('gear_small', 715, 615, smallOffset, smallOffset, this, 5),
		/*	13 */	new Gear('gear_small', 770, 770, smallOffset, smallOffset, this, 5),
		/*	14 */	new Gear('gear_big', 870, 715, bigOffset, bigOffset, this, 10),
		/*	15 */	new Gear('gear_small', 915, 760, smallOffset, smallOffset, this),
		/*	16 */	new Gear('gear_big', 970, 545, bigOffset, bigOffset, this, 5),
		/*	17 */	new Gear('gear_big', 870, 565, bigOffset, bigOffset, this, 5),
		/*	18 */	new Gear('gear_small', 1455, 260, smallOffset, smallOffset, this),
		/*	19 */	new Gear('gear_big', 1390, 360, bigOffset, bigOffset, this, 5),
		/*	20 */	new Gear('gear_small', 1475, 550, smallOffset, smallOffset, this),
		/*	21 */	new Gear('gear_small', 1435, 405, smallOffset, smallOffset, this, 15),
		/*	22 */	new Gear('gear_big', 1390, 360, bigOffset, bigOffset, this, 5),
		/*	23 */	new Gear('gear_big', 1240, 365, bigOffset, bigOffset, this, 5),
		/*	24 */	new Gear('gear_small', 1280, 265, smallOffset, smallOffset, this, 15),
		/*	25 */	new Gear('gear_big', 1045, 365, bigOffset, bigOffset, this, 5),
		/*	26 */	new Gear('gear_small', 515, 490, smallOffset, smallOffset, this, 10),
		/*	27 */	new Gear('gear_big', 615, 430, bigOffset, bigOffset, this, 5),
		/*	28 */	new Gear('gear_small', 770, 380, smallOffset, smallOffset, this, 10),
		/*	29 */	new Gear('gear_small', 335, 445, smallOffset, smallOffset, this, 10),
		/*	30 */	new Gear('gear_small_arm', 280, 160, smallOffset, smallOffset, this, -60, [0, 30, 60, 90, 120]),
		/*	31 */	new Gear('gear_small_arm', 480, 160, smallOffset, smallOffset, this, -60, [0, 30, 60, 90, 120]),
		/*	32 */	new Gear('gear_small_arm', 680, 160, smallOffset, smallOffset, this, -60, [0, 30, 60, 90, 120]),
		/*	33 */	new Gear('gear_small_arm', 880, 160, smallOffset, smallOffset, this, -60, [0, 30, 60, 90, 120]),
		/*	34 */	new Gear('gear_small_arm', 1080, 160, smallOffset, smallOffset, this, -60, [0, 30, 60, 90, 120]),
		/*	35 */	new Gear('gear_small_arm', 1280, 160, smallOffset, smallOffset, this, -60, [0, 30, 60, 90, 120]),
		/*	36 */	new Gear('gear_small_arm', 1480, 160, smallOffset, smallOffset, this, -60, [0, 30, 60, 90, 120]),
		];
		this.gears[0].connect(this.gears[2], 2, true, false);
		this.gears[1].connect(this.gears[3], 2, true, false);

		this.gears[4].connect(this.gears[30], 2);
		this.gears[29].connect(this.gears[4], 0.5);
		this.gears[11].connect(this.gears[29], 1);
		this.gears[2].connect(this.gears[11], 1);
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
