import { SpriteSheet } from './SpriteSheet';
import { Sprite } from './Sprite';

export interface DialogSpec {
}

export class Dialog {

	constructor(spec: DialogSpec) {
		this.sheet = new SpriteSheet('assets/dialog.png', 1);
		this.sprite = new Sprite();
		this.sprite.div.classList.add('dialog');
		this.sprite.setSheet(this.sheet);
		this.sprite.setFrame(0);
	}

/*
	show() {
		document.getElementById('diorama').appendChild(this.sprite.div);
	}
*/

	sheet: SpriteSheet;
	sprite: Sprite;

}
