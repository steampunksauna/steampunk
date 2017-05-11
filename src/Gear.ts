import { Cast } from './Scene';
import { Actor } from './Actor';
import { GearConnection } from './GearConnection';

export class Gear {

  cast: Cast;
  angle: number;
  connections: GearConnection[];
  lastNonce: string;

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
      originY: originY,
      onclick: (event) => this.test(event)
    };
    this.angle = 0;
    this.connections = [];
    this.lastNonce = "";
  }

  test(event:any) {
    this.rotate(5);
  }

  connect(other: Gear, ratio: number, propagate = true) {
    let connection = new GearConnection(other, ratio);
    this.connections.push(connection);
    if (propagate) {
      ratio = 1 / ratio
      other.connect(this, ratio, false);
    }
  }

  getCast() {
    return this.cast;
  }

  setAngle(angle: number) {
    this.angle = angle;
    this.cast.actor.rotate(angle);
  }

  rotate(angle: number, nonce?: string) {
    if (undefined == nonce)
      nonce = Math.random().toString()
    if (this.lastNonce == nonce)
      return;
    else
      this.lastNonce = nonce;
    this.angle = this.angle + angle;
    this.cast.actor.rotate(this.angle);
    this.connections.forEach((connection => {
        connection.rotate(angle, nonce);
    }));
  }

}
