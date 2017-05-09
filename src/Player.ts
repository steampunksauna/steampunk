import { Inventory } from './Inventory';
import { Actor } from './Actor';

export class Player {

	constructor() {
		this.actor = new Actor();
	}

	inventory: Inventory;
	actor: Actor;

}
