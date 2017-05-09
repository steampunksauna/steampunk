import { AnimationManager } from './AnimationManager';
import { SceneManager } from './SceneManager';
import { Player } from './Player';

export class App {

	constructor() {
		this.animationManager = new AnimationManager();
		this.sceneManager = new SceneManager();
		this.player = new Player();
	}

	animationManager: AnimationManager;
	sceneManager: SceneManager;
	player: Player;

}

new App();
