import { Cast } from './Scene';
import { Actor } from './Actor';

export class Gear {

  cast: Cast;

  constructor(id: string, x: number, y: number, originX: number, originY: number) {
    this.cast = {
      actor: new Actor({
        id: id,
        sheetUrl: 'assets/' + id + '.png',
        firstFrame: 0
      }),
      layer: 'puzzle',
      x: x,
      y: y,
      originX: originX,
      originY: originY
    };
  }

  getCast() {
    return this.cast;
  }

  setAngle(angle: number) {
    this.cast.actor.rotate(angle);
  }

}
