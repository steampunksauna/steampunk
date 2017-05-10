import { LoadState } from './Loader';
import { Layer, LayerSpec } from './Layer';
import { Thing } from './Thing';

import * as Promise from 'bluebird';

export interface SceneSpec {
	id: string;
	layers: LayerSpec[];
}

export class Scene {

	constructor(spec: SceneSpec) {
		this.id = spec.id;

		for(let layerSpec of spec.layers) {
			this.layerList.push(new Layer(layerSpec));
		}
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
	}

	id: string;
	state = LoadState.INIT;

	loaded: Promise<any>;

	layerList: Layer[] = [];
	thingList: Thing[] = [];

}
