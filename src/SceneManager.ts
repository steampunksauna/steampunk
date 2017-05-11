import * as Promise from 'bluebird';

import { Scene, SceneSpec } from './Scene';

export class SceneManager {

	constructor() {
		this.diorama = document.getElementById('diorama') as HTMLDivElement;
	}

	createScene(spec: SceneSpec) {
		const scene = new Scene(spec);

		this.sceneList.push(scene);
		this.sceneTbl[scene.id] = scene;
	}

	setScene(scene: Scene | string) {
		if(typeof(scene) == 'string') {
			scene = this.sceneTbl[scene];
		}

		return(
			scene.load().then(() => {
				const diorama = this.diorama;

				if(typeof(scene) == 'string') return; // Impossible...

				for(let node of Array.prototype.slice.call(diorama.children)) {
					diorama.removeChild(node);
				}

				scene.draw(diorama);
			})
		);
	}

	sceneList: Scene[] = [];
	sceneTbl: { [id: string]: Scene } = {};

	diorama: HTMLDivElement;

}
