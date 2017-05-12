import { Cast } from './Scene';
import { Actor } from './Actor';
import { Gear } from './Gear';

export class GearPuzzle {

	gears: Gear[];

	constructor() {
		this.gears = [
			new Gear('gear_small', 100, 100, 56, 56, [0, 30, 270]),
			new Gear('gear_big', 155, 165, 102, 102),
			new Gear('gear_small_arm', 300, 100, 56, 56),
			new Gear('hourhand', 389, 798, 2, 2, undefined, 'clockhands'),
			new Gear('minutehand', 389, 798, 1, 1, undefined, 'clockhands'),
		];
		this.gears[0].connect(this.gears[1], 0.5, true, false);
		this.gears[1].connect(this.gears[2], 2, false);
		this.gears[0].connect(this.gears[3], 1, true, true);
		this.gears[0].connect(this.gears[4], 1, true, false);
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
}
