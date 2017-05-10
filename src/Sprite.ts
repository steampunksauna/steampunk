import { SpriteSheet } from './SpriteSheet';

export class Sprite {

	constructor() {
		this.image = document.createElement('img');
		this.image.classList.add('sprite');
	}

	setSheet(sheet: SpriteSheet) {
		this.sheet = sheet;

		sheet.load().then((sheet: SpriteSheet) => {
			this.width = sheet.cellWidth;
			this.height = sheet.cellHeight;
			this.image.src = sheet.url;
			this.image.style.width = (this.width / 1920 * 100) + '%';
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
	width: number;
	height: number;
	image: HTMLImageElement;
	frame: number;

}
