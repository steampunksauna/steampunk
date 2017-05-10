import { SceneManager } from './SceneManager';
import { Actor } from './Actor';

export class GearPuzzle {

  gears: Actor[];

  constructor() {
    this.gears = [
      {
        actor: new Actor({
          id: 'gear_small',
          sheetUrl: 'assets/gear_small.png',
          firstFrame: 0
        }),
        layer: 'puzzle',
        x: 100,
        y: 100
      }, {
        actor: new Actor({
          id: 'gear_big',
          sheetUrl: 'assets/gear_big.png',
          firstFrame: 0
        }),
        layer: 'puzzle',
        x: 300,
        y: 150
      }, {
        actor: new Actor({
          id: 'gear_big_half',
          sheetUrl: 'assets/gear_big_half.png',
          firstFrame: 0
        }),
        layer: 'puzzle',
        x: 300,
        y: 400
      }, {
        actor: new Actor({
          id: 'gear_ratchet',
          sheetUrl: 'assets/gear_ratchet.png',
          firstFrame: 0
        }),
        layer: 'puzzle',
        x: 500,
        y: 500
      }, {
        actor: new Actor({
          id: 'pawl',
          sheetUrl: 'assets/pawl.png',
          firstFrame: 0
        }),
        layer: 'puzzle',
        x: 500,
        y: 500
      }, {
        actor: new Actor({
          id: 'gear_stepper_a',
          sheetUrl: 'assets/gear_stepper_a.png',
          firstFrame: 0
        }),
        layer: 'puzzle',
        x: 100,
        y: 400
      }, {
        actor: new Actor({
          id: 'gear_stepper_b',
          sheetUrl: 'assets/gear_stepper_b.png',
          firstFrame: 0
        }),
        layer: 'puzzle',
        x: 200,
        y: 400
      }
    ];
  }

  getGears() {
    return this.gears;
  }
}
