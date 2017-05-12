import { Actor } from './Actor';
import { SpriteSheet } from './SpriteSheet';
import { Sprite } from './Sprite';

export interface Script {
	[ id: string ]: (() => string) | { [key: string]: string };
}

export class Dialog {

	constructor(script: Script) {
		this.script = script;
		this.sheet = new SpriteSheet('assets/dialog.png', 1);

		const sprite = new Sprite();
		sprite.div.classList.add('dialog');
		sprite.setSheet(this.sheet);
		sprite.setFrame(0);

		const content = document.createElement('div');
		content.classList.add('dialog-content');
		sprite.div.appendChild(content);

		this.sprite = sprite;
		this.content = content;

		document.getElementById('dialog-modal')!.style.display = 'block';

		this.setState('init');
	}

	setState(state: string) {
		let spec = this.script[state];

		while(typeof(spec) == 'function') {
			spec = this.script[spec()];
		}

		this.state = state;

		console.log(state);
		console.log(spec);

		this.content.innerHTML = '<b>' + (this.script.actor as any as Actor).spec.name!.toUpperCase() + '</b><br>' + spec.text;
	}

/*
	show() {
		document.getElementById('diorama').appendChild(this.sprite.div);
	}
*/

	script: Script;
	state: string;
	sheet: SpriteSheet;
	sprite: Sprite;
	content: HTMLDivElement;

}
