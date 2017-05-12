import * as Promise from 'bluebird';

import { Scene, SceneSpec } from './Scene';
import { Player } from './Player';
import { Dialog } from './Dialog';

export class SceneManager {

	constructor(player: Player) {
		this.diorama = document.getElementById('diorama') as HTMLDivElement;
		this.player = player;
		player.sceneManager = this;
	}

	createScene(spec: SceneSpec) {
		const scene = new Scene(spec);

		this.sceneList.push(scene);
		this.sceneTbl[scene.id] = scene;
	}

	showDialog() {
		const dialog = new Dialog({});
		this.diorama.appendChild(dialog.sprite.div);
		dialog.sprite.div.style.zIndex = '' + this.scene.layerTbl['dialog'].depth;
	}

	setScene(s: Scene | string) {
		let scene: Scene;

		if(typeof(s) == 'string') {
			scene = this.sceneTbl[s];
		} else scene = s;

		this.scene = scene;

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

	scene: Scene;
	prevScene: Scene;

}
