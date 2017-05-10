import { LoadState } from './Loader';
import { Layer, LayerSpec } from './Layer';
import { Thing, ThingSpec } from './Thing';
import { Actor } from './Actor';

import * as Promise from 'bluebird';

export interface Cast {
	actor: Actor,
	x: number;
	y: number;
	layer: string
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
		}

		for(let cast of this.actorList) {
			diorama.appendChild(cast.actor.sprite.image);
			cast.actor.sprite.image.style.left = (cast.x / 1920 * 100) + '%';
			cast.actor.sprite.image.style.top = (cast.y / 1080 * 100) + '%';
			cast.actor.sprite.image.style.zIndex = '' + this.layerTbl[cast.layer].depth;
		}
	}

	id: string;
	state = LoadState.INIT;

	loaded: Promise<any>;

	layerList: Layer[] = [];
	layerTbl: { [id: string]: Layer } = {};

	thingList: Thing[] = [];

	actorList: Cast[] = [];

}
