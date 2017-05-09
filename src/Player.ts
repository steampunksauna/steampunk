import { Inventory } from './Inventory';
import { Sprite } from './Sprite';

export class Player {

	constructor() {
		this.sprite = new Sprite();
	}

	inventory: Inventory;
	sprite: Sprite;

}
