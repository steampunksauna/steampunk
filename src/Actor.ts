import * as Bluebird from 'bluebird';

import { SpriteSheet } from './SpriteSheet';
import { Sprite } from './Sprite';

export interface DummyConstructor extends Bluebird<any> {
	new<T>(): Bluebird<T>;
}

declare global {
	interface Promise<T> extends Bluebird<T> {
		then(...args: any[]): any;
		catch(...args: any[]): any;
	}

	interface PromiseConstructor extends DummyConstructor {}

	var Promise: Promise<any>;
}

Promise = Bluebird as any;

export interface ActorSpec {
	id: string;
	sheetUrl: string;
	sheetFrames?: number;
	firstFrame: number;
	onclick?: (e: MouseEvent) => any;
}

let angle = 0;

export class Actor {

	constructor(spec: ActorSpec) {
		this.sheet = new SpriteSheet(spec.sheetUrl, spec.sheetFrames || 1);
		this.sprite = new Sprite();
		this.sprite.div.classList.add('actor');
		this.sprite.setSheet(this.sheet);
		this.sprite.setFrame(spec.firstFrame);
		if(spec.onclick) this.sprite.div.onclick = spec.onclick;
	}

	setOrigin(x: number, y: number) {
		this.sprite.div.style.transformOrigin = (x / this.sprite.width * 100) + '% ' + (y / this.sprite.height * 100) + '%';
	}

	async rotate(angle: number) {
		this.sprite.div.style.transform = 'rotate(' + angle + 'deg)';
	}

	moveTo(x: number, y: number) {
		this.sprite.moveTo(x, y);
	}

	async walkTo(toX: number, toY: number) {
		let x = this.sprite.x;
		let y = this.sprite.y;
		const delta = toX - x;
		const sign = delta < 0 ? -1 : 1;
		let frame = 0;

		while((toX - x) * sign > 0) {
			await Promise.delay(33);
			this.sprite.moveTo(x, y);
			this.sprite.setFrame(frame % 12 + 2);
			x += sign * 30;
			++frame;
		}
	}

	sheet: SpriteSheet;
	sprite: Sprite;

}
