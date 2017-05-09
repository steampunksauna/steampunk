export class Sprite {

	constructor() {
		this.element = document.createElement('div');
		document.body.appendChild(this.element);
	}

	x: number;
	y: number;
	element: Element;

}
