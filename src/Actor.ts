import * as Promise from 'bluebird';

import { SpriteSheet } from './SpriteSheet';
import { Sprite } from './Sprite';

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

	sheet: SpriteSheet;
	sprite: Sprite;

}
