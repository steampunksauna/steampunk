import * as Bluebird from 'bluebird';

import { SceneManager } from './SceneManager';
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

	interface PromiseConstructor extends DummyConstructor {
		new(...args: any[]): any;
		resolve: any;
	}

	var Promise: PromiseConstructor;
}

Promise = Bluebird as any;

export interface ActorSpec {
	id: string;
	name?: string;
	script?: any;
	sheetUrl: string;
	sheetFrames?: number;
	firstFrame: number;
	onclick?: (e: MouseEvent) => any;
}

let angle = 0;

export class Actor {

	constructor(spec: ActorSpec) {
		this.spec = spec;
		this.sheet = new SpriteSheet(spec.sheetUrl, spec.sheetFrames || 1);
		this.sprite = new Sprite();
		this.sprite.div.classList.add('actor');
		this.sprite.div.classList.add(spec.id);
		this.sprite.setSheet(this.sheet);
		this.sprite.setFrame(spec.firstFrame);
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

	async idle(offset: number) {
		let frame = 0;
		this.idling = true;

		while(this.idling) {
			this.sprite.div.style.width = ~~(this.sprite.width * document.body.clientWidth / 1920) + 'px';
			await Promise.delay(33 * 3);
			this.sprite.setFrame(frame % this.sheet.frameCount, 0, offset);
			++frame;
		}
	}

	async walkTo(toX: number, toY: number) {
		let resolve: any;
		let reject: any;

		this.ready = new Promise((res: any, rej: any) => {
			resolve = res;
			reject = rej;
		});

		let x = this.sprite.x;
		let y = this.sprite.y;
		const delta = toX - x;
		const sign = delta < 0 ? -1 : 1;
		let frame = 0;
		const animId = ++this.animId;

		this.sprite.div.style.transform = 'scaleX(' + (sign > 0 ? -1 : 1) + ')';

		while(this.animId <= animId && (toX - x) * sign > 0) {
			this.sprite.div.style.width = ~~(this.sprite.width * document.body.clientWidth / 1920) + 'px';
			await Promise.delay(33);
			this.sprite.moveTo(x + sign * 20, y);
			this.sprite.setFrame(frame % 11 + 1, 0, 0.03);
			x += sign * 12;
			++frame;
		}

		if(this.animId <= animId) {
			this.sprite.setFrame(0);
			resolve();
		}
	}

	talkTo(target: Actor, event?: MouseEvent) {
		event!.stopPropagation();
		event!.preventDefault();

		this.walkTo(target.sprite.x - 200, 0);
		this.ready.then(() => {
			this.sprite.div.style.transform = 'scaleX(-1)';

			this.sceneManager.showDialog(target.spec.script);
		});
	}

	spec: ActorSpec;
	idling = false;
	animId = 0;
	ready = Promise.resolve(true);

	sceneManager: SceneManager;
	sheet: SpriteSheet;
	sprite: Sprite;

}
