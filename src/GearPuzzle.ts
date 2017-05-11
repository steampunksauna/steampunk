import { Cast } from './Scene';
import { Actor } from './Actor';
import { Gear } from './Gear';

export class GearPuzzle {

  gears: Gear[];

  constructor() {
    this.gears = [
      new Gear('gear_small', 100, 100, 50, 50),
      new Gear('gear_big', 155, 165, 50, 50),
      new Gear('gear_big_half', 300, 400, 50, 50),
      new Gear('gear_ratchet', 500, 500, 50, 50),
      new Gear('pawl', 500, 500, 50, 50),
      new Gear('gear_stepper_a', 100, 400, 50, 50),
      new Gear('gear_stepper_b', 200, 400, 50, 50),
    ];
    this.gears[0].connect(this.gears[1], 0.5);
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
