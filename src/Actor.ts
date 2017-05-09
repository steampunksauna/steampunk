import { Thing } from './Thing';

export class Actor {

	constructor() {
		this.thing = new Thing();
	}

	/** Actors are clickable things. */
	thing: Thing;

}
