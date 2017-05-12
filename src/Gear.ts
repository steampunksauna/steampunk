import { Cast } from './Scene';
import { Actor } from './Actor';
import { GearConnection } from './GearConnection';
import { GearPuzzle } from './GearPuzzle';

export class Gear {

	cast: Cast;
	angle: number;
	connections: GearConnection[];
	lastNonce: string;
	positions: number[];
	currentPositionIndex = 0;
	degreeStep = 2;
	parent: GearPuzzle;

	constructor(id: string, x: number, y: number, originX: number, originY: number, parent: GearPuzzle, positions?: number[], layer?: string) {
		let defaultLayer = 'puzzle';
		if (undefined != layer)
			defaultLayer = layer;
		this.cast = {
			actor: new Actor({
				id: id,
				sheetUrl: 'assets/' + id + '.png',
				firstFrame: 0
			}),
			layer: defaultLayer,
			x: x,
			y: y,
			originX: originX,
			originY: originY
		};
		if (positions) {
			this.positions = positions;
			this.cast.onclick = (event) => this.clickToggle(event)
		}
		this.angle = 0;
		this.connections = [];
		this.lastNonce = "";
		this.parent = parent;
	}

	async clickToggle(event:any) {
		let distance = 0;
		let step = this.degreeStep;
		if (this.currentPositionIndex < this.positions.length - 1) {
			distance = (this.positions[this.currentPositionIndex + 1] - this.positions[this.currentPositionIndex]) / step;
		} else {
			distance = (this.positions[0] - this.positions[this.currentPositionIndex]) / step;
		}
		if (distance < 0) {
			distance = Math.abs(distance);
			step *= -1;
		}
		for (let r = 0; r < distance; r++) {
			this.rotate(step);
			await Promise.delay(1000 / 60);
		}
		if (distance != Math.round(distance)) {
			let error = distance - Math.floor(distance);
			this.rotate(-step * error);
		}
		this.currentPositionIndex++;
		if (this.currentPositionIndex >= this.positions.length)
			this.currentPositionIndex = 0;
		this.parent.checkSolution();
	}

	connect(other: Gear, ratio: number, propagate = true, inverted = true) {
		let connection = new GearConnection(other, ratio, inverted);
		this.connections.push(connection);
		if (propagate) {
			ratio = 1 / ratio;
			other.connect(this, ratio, false, inverted);
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
