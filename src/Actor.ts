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
	firstFrame: number;
}

export class Actor {

	constructor(spec: ActorSpec) {
		this.sheet = new SpriteSheet(spec.sheetUrl);
		this.sprite = new Sprite();
		this.sprite.image.classList.add('actor');
		this.sprite.setSheet(this.sheet);
		this.sprite.setFrame(spec.firstFrame);
	}

	moveTo(x: number, y: number) {
		this.sprite.image.style.left = (x / 1920 * 100) + '%';
		this.sprite.image.style.top = (y / 1080 * 100) + '%';
	}

	setOrigin(x: number, y: number) {
		this.sprite.image.style.transformOrigin = (x / 1920 * 100) + '% ' + (y / 1080 * 100) + '%';
	}

	async rotate(angle: number) {
		this.sprite.image.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
	}

	async walkTo(x: number, y: number) {
		while(1) {
			await Promise.delay(100);
			this.rotate(0);
		}
	}

	sheet: SpriteSheet;
	sprite: Sprite;

}
