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
      new Gear('gear_big_half', 300, 400, 50, 50),
      new Gear('gear_ratchet', 500, 500, 50, 50),
      new Gear('pawl', 500, 500, 50, 50),
      new Gear('gear_stepper_a', 100, 400, 50, 50),
      new Gear('gear_stepper_b', 200, 400, 50, 50),
    ];
    this.gears[0].connect(this.gears[1], 0.5, true, false);
    this.gears[1].connect(this.gears[2], 2, false);
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
