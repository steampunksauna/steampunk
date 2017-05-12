import { Actor } from './Actor';
import { SpriteSheet } from './SpriteSheet';
import { Sprite } from './Sprite';

export interface Script {
	[ id: string ]: (() => string) | { [key: string]: string };
}

export class Dialog {

	constructor(script: Script) {
		this.script = script;
		this.sheetDialog = new SpriteSheet('assets/dialog.png', 1);
		this.sheetButton = new SpriteSheet('assets/button.png', 1);

		const sprite = new Sprite();
		sprite.div.classList.add('dialog');
		sprite.setSheet(this.sheetDialog);
		sprite.setFrame(0);

		const content = document.createElement('div');
		content.classList.add('dialog-content');
		sprite.div.appendChild(content);

		this.sprite = sprite;
		this.content = content;
		this.modal = document.getElementById('dialog-modal') as HTMLDivElement;

		this.modal.style.display = 'block';

		this.setState('init');
	}

	setState(state: string) {
		if(state == 'end') {
			this.sprite.div.parentNode!.removeChild(this.sprite.div);
			this.modal.style.display = 'none';
			return;
		}
		let spec = this.script[state];

		while(typeof(spec) == 'function') {
			state = spec();
			spec = this.script[state];
		}

		this.state = state;

		this.content.innerHTML = '<b>' + (this.script.actor as any as Actor).spec.name!.toUpperCase() + '</b><br>' + spec.text;

		for(let node of Array.prototype.slice.call(this.modal.children)) {
			this.modal.removeChild(node);
		}

		let i = 0;

		for(let action of Object.keys(spec)) {
			if(action != 'text') {
				this.addButton(action);
			}
		}

		++i;
	}

	addButton(action: string) {
		const sprite = new Sprite();
		sprite.div.classList.add('dialog-button');
		sprite.setSheet(this.sheetButton);
		sprite.setFrame(0);

		const content = document.createElement('div');
		content.classList.add('dialog-button-content');

		content.innerHTML = action;

		sprite.div.appendChild(content);
		sprite.div.onclick = (e: MouseEvent) => {
			this.setState(this.script[this.state][action]);
		};

		this.modal.appendChild(sprite.div);
	}

/*
	show() {
		document.getElementById('diorama').appendChild(this.sprite.div);
	}
*/

	script: Script;
	state: string;
	sheetDialog: SpriteSheet;
	sheetButton: SpriteSheet;
	sprite: Sprite;
	content: HTMLDivElement;
	modal: HTMLDivElement;

}
