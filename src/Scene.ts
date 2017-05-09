import { Layer, LayerSpec } from './Layer';
import { Thing } from './Thing';

import * as Promise from 'bluebird';

export interface SceneSpec {
	name: string;
	layers: LayerSpec[];
}

export const enum SceneState {
	INIT,
	LOADING,
	READY
}

export class Scene {

	constructor(spec: SceneSpec) {
		this.name = spec.name;

		for(let layerSpec of spec.layers) {
			this.layerList.push(new Layer(layerSpec));
		}
	}

	init() {
		if(this.state == SceneState.INIT) {
			this.state = SceneState.LOADING;

			this.loaded = Promise.map(
				this.layerList,
				(layer: Layer) => layer.init()
			).then(() => {
				this.state = SceneState.READY;
			});
		}

		return(this.loaded);
	}

	draw(diorama: HTMLDivElement) {
		for(let layer of this.layerList) {
			diorama.appendChild(layer.image);
		}
	}

	name: string;
	state = SceneState.INIT;

	loaded: Promise<any>;

	layerList: Layer[] = [];
	thingList: Thing[] = [];

}
