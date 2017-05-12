import * as Promise from 'bluebird';

import { Scene, SceneSpec } from './Scene';
import { Player } from './Player';
import { Dialog } from './Dialog';
import { audiomanager } from './AudioManager';

export class SceneManager {

	ambientAudio: {[id: string]: string} = {
		'gearpuzzle': 'cogwheel',
		'konehuone': 'engineroom',
		'asemahalli1': 'hall_ambience',
		'asemahalli2': 'hall_ambience',
		'asemahalli3': 'hall_ambience',
	};

	constructor(player: Player) {
		this.diorama = document.getElementById('diorama') as HTMLDivElement;
		this.player = player;
		player.sceneManager = this;
		for (let idx of Object.keys(this.ambientAudio)) {
			let name = this.ambientAudio[idx];
			audiomanager.createAudio(name, name);
		}
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

				audiomanager.clearLoops();
				if (this.ambientAudio[scene.id])
					audiomanager.loop(this.ambientAudio[scene.id]);
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
