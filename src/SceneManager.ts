import * as Promise from 'bluebird';

import { Scene, SceneSpec } from './Scene';
import { Player } from './Player';

export class SceneManager {

	constructor(player: Player) {
		this.diorama = document.getElementById('diorama') as HTMLDivElement;
		this.player = player;
	}

	createScene(spec: SceneSpec) {
		const scene = new Scene(spec);

		this.sceneList.push(scene);
		this.sceneTbl[scene.id] = scene;
	}

	setScene(s: Scene | string) {
		let scene: Scene;

		if(typeof(s) == 'string') {
			scene = this.sceneTbl[s];
		} else scene = s;

		return(
			scene.load().then(() =>Promise.delay(100)).then(() => this.player.ready).then(() => {
				const diorama = this.diorama;

				if(typeof(scene) == 'string') return; // Impossible...

				for(let node of Array.prototype.slice.call(diorama.children)) {
					diorama.removeChild(node);
				}

				scene.draw(diorama, this.prevScene && this.prevScene.id);
				this.prevScene = scene;
			})
		);
	}

	sceneList: Scene[] = [];
	sceneTbl: { [id: string]: Scene } = {};

	diorama: HTMLDivElement;
	player: Player;

	prevScene: Scene;

}
