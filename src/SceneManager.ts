import * as Promise from 'bluebird';

import { Scene, SceneSpec } from './Scene';

export class SceneManager {

	constructor() {
		const diorama = document.createElement('div')
		diorama.className = 'diorama';

		document.body.appendChild(diorama);
		this.diorama = diorama;
	}

	createScene(spec: SceneSpec) {
		const scene = new Scene(spec);

		this.sceneList.push(scene);
		this.sceneTbl[scene.name] = scene;
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
	sceneTbl: { [name: string]: Scene } = {};

	diorama: HTMLDivElement;

}
