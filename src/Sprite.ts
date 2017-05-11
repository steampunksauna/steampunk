import { SpriteSheet } from './SpriteSheet';

export class Sprite {

	constructor() {
		this.div = document.createElement('div');
		this.div.classList.add('sprite');
	}

	setSheet(sheet: SpriteSheet) {
		this.sheet = sheet;

		sheet.load().then((sheet: SpriteSheet) => {
			this.width = sheet.cellWidth;
			this.height = sheet.cellHeight;
			this.div.style.backgroundImage = 'url("' + sheet.url + '")';
			this.div.style.width = (this.width / 1920 * 100) + '%';
			this.div.style.height = (this.height / 1080 * 100) + '%';
			// this.div.style.backgroundSize = this.div.style.width + ' ' + this.div.style.height;
			this.div.style.backgroundSize = (100 * sheet.frameCount) + '% 100%';
		});
	}

	setFrame(frame: number) {
		console.log(frame);
		this.div.style.backgroundPositionX = (100 * frame) + '%';
		this.frame = frame;
	}

	moveTo(x: number, y: number) {
		this.div.style.left = (x / 1920 * 100) + '%';
		this.div.style.top = (y / 1080 * 100) + '%';
		this.x = x;
		this.y = y;
	}

	sheet: SpriteSheet;
	x: number;
	y: number;
	width: number;
	height: number;
	div: HTMLDivElement;
	// image: HTMLImageElement;
	frame: number;

}
