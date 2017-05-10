import { Inventory } from './Inventory';
import { Actor, ActorSpec } from './Actor';

export interface PlayerSpec extends ActorSpec {
}

export class Player extends Actor {

	constructor(spec: PlayerSpec) {
		super(spec);
	}

	inventory: Inventory;

}
