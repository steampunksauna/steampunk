import { Scene } from './Scene';
import { Sprite } from './Sprite';

export interface ThingSpec {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
}

export class Thing {

	constructor() {
		const div = document.createElement('div');

		div.classList.add('thing');
		div.classList.add('thing-debug');

		this.div = div;
	}

	div: HTMLDivElement;
	sprite?: Sprite;

}
