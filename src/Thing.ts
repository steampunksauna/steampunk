import { Scene } from './Scene';
import { Sprite } from './Sprite';

export interface ThingSpec {
	id: string;
}

export class Thing {

	constructor() {
	}

	sprite?: Sprite;

}
