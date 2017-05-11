import { UI } from './UI';
// import { AnimationManager } from './AnimationManager';
import { SceneManager } from './SceneManager';
import { Player } from './Player';
import { Actor } from './Actor';
import { GearPuzzle } from './GearPuzzle';

export class App {

	constructor() {
		// this.animationManager = new AnimationManager();
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
			things: [
				{
					id: 'door',
					layer: 'walkway',
					x: 100,
					y: 200,
					width: 300,
					height: 50,
					onclick: (e: MouseEvent) => alert(1)
				}
			],
			actors: [
				{
					actor: this.player,
					layer: 'walkway',
					x: 400,
					y: 550,
					originX: 60,
					originY: 120,
					onclick: (e: MouseEvent) => alert(2)
				}
			]
		});

		this.gearpuzzle = new GearPuzzle();

		this.sceneManager.createScene({
			id: 'gearpuzzle',
			layers: [{
				id: 'puzzle',
				depth: 100
			}],
			things: [],
			actors: this.gearpuzzle.getCasts()
		});

		this.sceneManager.setScene('init');

		document.body.onclick = (e: MouseEvent) => {
			this.player.walkTo(e.clientX / window.innerWidth * 1920, 100);
		};
	}

	ui: UI;
	// animationManager: AnimationManager;
	sceneManager: SceneManager;
	player: Player;
	gearpuzzle: GearPuzzle;

}

new App();
