import { LoadState } from './Loader';
import { Layer, LayerSpec } from './Layer';
import { Thing, ThingSpec } from './Thing';
import { Actor } from './Actor';

import * as Promise from 'bluebird';

export interface Cast {
	actor: Actor,
	x: number;
	y: number;
	originX?: number;
	originY?: number;
	angle?: number;
	layer: string;
	onclick?: (e: MouseEvent) => any;
}

export interface SceneSpec {
	id: string;
	layers: LayerSpec[];
	things: ThingSpec[];
	actors: Cast[];
}

export class Scene {

	constructor(spec: SceneSpec) {
		this.id = spec.id;

		for(let layerSpec of spec.layers) {
			const layer = new Layer(layerSpec);

			this.layerList.push(layer);
			if(layer.id) this.layerTbl[layer.id] = layer;
		}

		for(let thingSpec of spec.things) {
			const thing = new Thing(thingSpec);

			this.thingList.push(thing);
			if(thing.id) this.thingTbl[thing.id] = thing;
		}

		this.actorList = spec.actors;
	}

	load() {
		if(this.state == LoadState.INIT) {
			this.state = LoadState.LOADING;

			this.loaded = Promise.map(
				this.layerList,
				(layer: Layer) => layer.load()
			).then(() => {
				this.state = LoadState.READY;
			});
		}

		return(this.loaded);
	}

	draw(diorama: HTMLDivElement) {
		for(let layer of this.layerList) {
			diorama.appendChild(layer.pic.image);
		}

		for(let thing of this.thingList) {
			diorama.appendChild(thing.div);
			thing.moveTo(thing.x, thing.y);
			thing.div.style.zIndex = '' + this.layerTbl[thing.layer].depth;
		}

		for(let cast of this.actorList) {
			diorama.appendChild(cast.actor.sprite.div);
			cast.actor.moveTo(cast.x, cast.y);
			if(typeof(cast.originX) == 'number' && typeof(cast.originY) == 'number') cast.actor.setOrigin(cast.originX, cast.originY);
			cast.actor.sprite.div.style.zIndex = '' + this.layerTbl[cast.layer].depth;
			if(cast.onclick) cast.actor.sprite.div.onclick = cast.onclick;
		}
	}

	id: string;
	state = LoadState.INIT;

	loaded: Promise<any>;

	layerList: Layer[] = [];
	layerTbl: { [id: string]: Layer } = {};

	thingList: Thing[] = [];
	thingTbl: { [id: string]: Thing } = {};

	actorList: Cast[] = [];

}
