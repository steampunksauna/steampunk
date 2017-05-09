import { Sprite } from './Sprite';

export class App {

	constructor() {
		this.player = new Sprite();
	}

	player: Sprite;

}

new App();
