import { UI } from './UI';
import { AnimationManager } from './AnimationManager';
import { SceneManager } from './SceneManager';
import { Player } from './Player';
import { Actor } from './Actor';

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
					url: 'assets/konehuone2.png',
					id: 'background',
					depth: 100
				},
				{
					id: 'walkway',
					depth: 200
				},
				{
					url: 'assets/konehuone.png',
					id: 'desk',
					depth: 300
				}
			],
			things: [],
			actors: [
				{
					actor: this.player,
					layer: 'walkway'
				}
			]
		});

		this.sceneManager.createScene({
			id: 'gearpuzzle',
			layers: [{
				id: 'puzzle',
				depth: 100
			}],
			things: [],
			actors: [
				{
					actor: new Actor({
						id: 'gear_small',
						sheetUrl: 'assets/gear_small.png',
						firstFrame: 0
					}
					),
					layer: 'puzzle'
				}
			]
		});

		this.sceneManager.setScene('gearpuzzle');
	}

	ui: UI;
	animationManager: AnimationManager;
	sceneManager: SceneManager;
	player: Player;

}

new App();
