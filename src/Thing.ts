import { Scene } from './Scene';
import { Sprite } from './Sprite';

export interface ThingSpec {
	id: string;
	layer: string;
	x: number;
	y: number;
	width: number;
	height: number;
	onclick?: (e: MouseEvent) => any;
}

export class Thing {

	constructor(spec: ThingSpec) {
		const div = document.createElement('div');

		div.classList.add('thing');
		div.classList.add('thing-debug');

		this.width = spec.width;
		this.height = spec.height;
		this.layer = spec.layer;

		this.div = div;

		this.moveTo(spec.x, spec.y);
		this.div.style.width = (spec.width / 1920 * 100) + '%';
		this.div.style.height = (spec.height / 1080 * 100) + '%';
		if(spec.onclick) this.div.onclick = spec.onclick;
	}

	moveTo(x: number, y: number) {
		if(this.sprite) {
			this.sprite.moveTo(x, y);
		} else {
			this.div.style.left = (x / 1920 * 100) + '%';
			this.div.style.top = (y / 1080 * 100) + '%';
		}

		this.x = x;
		this.y = y;
	}

	div: HTMLDivElement;
	sprite?: Sprite;

	layer: string;
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;

}
