import { Gear } from './Gear';

export class GearConnection {

  other: Gear;
  ratio: number;
  forwardLock: boolean;
  backwardLock: boolean;

  constructor(other: Gear, ratio: number, forwardLock = true, backwardLock = true) {
    this.other = other;
    this.ratio = ratio;
    this.forwardLock = forwardLock;
    this.backwardLock = backwardLock;
  }

  getOther() {
    return this.other;
  }

  getRatio() {
    return this.ratio;
  }

  rotate(angle: number) {
    if (angle > 0 && this.forwardLock) {
      this.other.rotate(-angle * this.ratio, false);
    } else if (this.backwardLock) {
      this.other.rotate(-angle * this.ratio, false);
    }
  }

}
