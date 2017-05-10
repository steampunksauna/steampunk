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
					layer: 'walkway',
					x: 0,
					y: 0
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
					}),
					layer: 'puzzle',
					x: 100,
					y: 100
				}, {
					actor: new Actor({
						id: 'gear_big',
						sheetUrl: 'assets/gear_big.png',
						firstFrame: 0
					}),
					layer: 'puzzle',
					x: 300,
					y: 150
				}, {
					actor: new Actor({
						id: 'gear_big_half',
						sheetUrl: 'assets/gear_big_half.png',
						firstFrame: 0
					}),
					layer: 'puzzle',
					x: 300,
					y: 400
				}, {
					actor: new Actor({
						id: 'gear_ratchet',
						sheetUrl: 'assets/gear_ratchet.png',
						firstFrame: 0
					}),
					layer: 'puzzle',
					x: 500,
					y: 500
				}, {
					actor: new Actor({
						id: 'pawl',
						sheetUrl: 'assets/pawl.png',
						firstFrame: 0
					}),
					layer: 'puzzle',
					x: 500,
					y: 500
				}, {
					actor: new Actor({
						id: 'gear_stepper_a',
						sheetUrl: 'assets/gear_stepper_a.png',
						firstFrame: 0
					}),
					layer: 'puzzle',
					x: 100,
					y: 400
				}, {
					actor: new Actor({
						id: 'gear_stepper_b',
						sheetUrl: 'assets/gear_stepper_b.png',
						firstFrame: 0
					}),
					layer: 'puzzle',
					x: 150,
					y: 400
				}
			]
		});

		this.sceneManager.setScene('gearpuzzle');

		this.player.walkTo(0, 0);
	}

	ui: UI;
	animationManager: AnimationManager;
	sceneManager: SceneManager;
	player: Player;

}

new App();
