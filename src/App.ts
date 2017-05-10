import { UI } from './UI';
import { AnimationManager } from './AnimationManager';
import { SceneManager } from './SceneManager';
import { Player } from './Player';

export class App {

	constructor() {
		this.animationManager = new AnimationManager();
		this.sceneManager = new SceneManager();
		this.player = new Player({
			id: 'player',
			sheetUrl: 'assets/player.png',
			firstFrame: 0
		});

		this.sceneManager.createScene({
			id: 'init',
			layers: [
				{
					url: 'assets/bg.jpg',
					depth: 100
				}
			]
		});

		this.sceneManager.setScene('init');
	}

	ui: UI;
	animationManager: AnimationManager;
	sceneManager: SceneManager;
	player: Player;

}

new App();
