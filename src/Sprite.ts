import { SpriteSheet } from './SpriteSheet';

export class Sprite {

	constructor() {
		this.image = document.createElement('img');
		this.image.classList.add('sprite');
		document.body.appendChild(this.image);
	}

	setSheet(sheet: SpriteSheet) {
		this.sheet = sheet;

		sheet.load().then((sheet: SpriteSheet) => {
			this.image.src = sheet.url;
		});
	}

	setFrame(frame: number) {
		this.frame = frame;
	}

	moveTo(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	sheet: SpriteSheet;
	x: number;
	y: number;
	image: HTMLImageElement;
	frame: number;

}
