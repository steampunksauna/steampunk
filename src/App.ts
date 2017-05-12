import { UI } from './UI';
// import { AnimationManager } from './AnimationManager';
import { SceneManager } from './SceneManager';
import { Player } from './Player';
import { Actor } from './Actor';
import { GearPuzzle } from './GearPuzzle';

const portalWidth = 320;

export class App {

	constructor() {
		// this.animationManager = new AnimationManager();
		this.player = new Player({
			id: 'player',
			sheetUrl: 'assets/walk2.png',
			sheetFrames: 12,
			firstFrame: 0
		});

		const engineer = new Actor({
			id: 'engineer',
			sheetUrl: 'assets/engineer.png',
			sheetFrames: 12,
			firstFrame: 0
		});

		const seller = new Actor({
			id: 'seller',
			sheetUrl: 'assets/seller.png',
			sheetFrames: 12,
			firstFrame: 0
		});

		const okru = new Actor({
			id: 'okru',
			sheetUrl: 'assets/guard2.png',
			sheetFrames: 12,
			firstFrame: 0
		});

		const strazu = new Actor({
			id: 'strazu',
			sheetUrl: 'assets/guard2.png',
			sheetFrames: 12,
			firstFrame: 0
		});

		const conductor = new Actor({
			id: 'conductor',
			sheetUrl: 'assets/conductor2.png',
			sheetFrames: 12,
			firstFrame: 0
		});

		const gear1 = new Actor({
			id: 'gear1',
			sheetUrl: 'assets/ratas.png',
			sheetFrames: 1,
			firstFrame: 0
		});

		const gear2 = new Actor({
			id: 'gear2',
			sheetUrl: 'assets/ratas.png',
			sheetFrames: 1,
			firstFrame: 0
		});

		gear1.sprite.div.classList.add('spin1');
		gear2.sprite.div.classList.add('spin2');

		this.sceneManager = new SceneManager(this.player);

		this.sceneManager.createScene({
			id: 'konehuone',
			layers: [
				{
					url: 'assets/konehuone2.png',
					id: 'background',
					depth: 100,
					offset: 0
				},
				{
					id: 'machine',
					depth: 150
				},
				{
					id: 'walkway',
					depth: 200
				},
				{
					url: 'assets/konehuone.png',
					id: 'desk',
					depth: 300
				},
				{
					id: 'desk-top',
					depth: 400
				},
				{
					id: 'dialog',
					depth: 500
				}
			],
			things: [
				{
					id: 'door',
					layer: 'walkway',
					x: 0,
					y: 220,
					width: 340,
					height: 650,
					onclick: (e: MouseEvent) => this.sceneManager.setScene('asemahalli1')
				}, {
					id: 'door',
					layer: 'walkway',
					x: 1475,
					y: 350,
					width: 400,
					height: 550,
					onclick: (e: MouseEvent) => this.sceneManager.setScene('gearpuzzle')
				}
			],
			actors: [
				{
					actor: this.player,
					layer: 'walkway',
					x: 100,
					y: 550 - 80
				},
				{
					actor: engineer,
					layer: 'desk-top',
					x: 778,
					y: 508,
					onclick: (e: MouseEvent) => this.player.talkTo(engineer, e)
				},
				{
					actor: gear1,
					layer: 'machine',
					x: 1520 + 10,
					y: 680,
					originX: 76,
					originY: 81
				},
				{
					actor: gear2,
					layer: 'machine',
					x: 1700 - 10,
					y: 680,
					originX: 76,
					originY: 81
				}
			]
		});

		this.sceneManager.createScene({
			id: 'asemahalli1',
			layers: [
				{
					url: 'assets/asemahalli.png',
					id: 'background',
					depth: 100
				},
				{
					id: 'counter',
					depth: 200
				},
				{
					id: 'walkway',
					depth: 300
				},
				{
					id: 'dialog',
					depth: 400
				}
			],
			things: [
				{
					id: 'door',
					layer: 'walkway',
					x: 330,
					y: 460,
					width: 164,
					height: 480,
					onclick: (e: MouseEvent) => this.player.ready.then(() => this.sceneManager.setScene('konehuone'))
				},
				{
					id: 'portal1',
					layer: 'walkway',
					x: 0,
					y: 0,
					width: portalWidth,
					height: 1080,
					onclick: (e: MouseEvent) => this.player.ready.then(() => this.sceneManager.setScene('asemahalli3'))
				},
				{
					id: 'portal2',
					layer: 'walkway',
					x: 1920 - portalWidth,
					y: 0,
					width: portalWidth,
					height: 1080,
					onclick: (e: MouseEvent) => this.sceneManager.setScene('asemahalli2')
				}
			],
			actors: [
				{
					actor: this.player,
					layer: 'walkway',
					x: 350,
					altX: {
						asemahalli2: 1400
					},
					y: 650 - 80
				},
				{
					actor: seller,
					layer: 'counter',
					x: 1040,
					y: 600,
					onclick: (e: MouseEvent) => this.player.talkTo(seller, e)
				}
			]
		});

		this.sceneManager.createScene({
			id: 'asemahalli2',
			layers: [
				{
					url: 'assets/asemahalli.png',
					id: 'background',
					depth: 100,
					offset: -1600
				},
				{
					id: 'behind',
					depth: 200
				},
				{
					id: 'walkway',
					depth: 300
				},
				{
					id: 'dialog',
					depth: 400
				}
			],
			things: [
				{
					id: 'portal1',
					layer: 'walkway',
					x: 0,
					y: 0,
					width: portalWidth,
					height: 1080,
					onclick: (e: MouseEvent) => this.player.ready.then(() => this.sceneManager.setScene('asemahalli1'))
				},
				{
					id: 'portal2',
					layer: 'walkway',
					x: 1920 - portalWidth,
					y: 0,
					width: portalWidth,
					height: 1080,
					onclick: (e: MouseEvent) => this.player.ready.then(() => this.sceneManager.setScene('asemahalli3'))
				}
			],
			actors: [
				{
					actor: this.player,
					layer: 'walkway',
					x: 350,
					altX: {
						asemahalli3: 1400
					},
					y: 650 - 80
				},
				{
					actor: conductor,
					layer: 'behind',
					x: 1200,
					y: 560
				}
			]
		});

		this.sceneManager.createScene({
			id: 'asemahalli3',
			layers: [
				{
					url: 'assets/asemahalli.png',
					id: 'background',
					depth: 100,
					offset: -3180
				},
				{
					id: 'door',
					depth: 200
				},
				{
					id: 'walkway',
					depth: 300
				},
				{
					id: 'dialog',
					depth: 400
				}
			],
			things: [
				{
					id: 'portal1',
					layer: 'walkway',
					x: 0,
					y: 0,
					width: portalWidth,
					height: 1080,
					onclick: (e: MouseEvent) => this.player.ready.then(() => this.sceneManager.setScene('asemahalli2'))
				},
				{
					id: 'portal2',
					layer: 'walkway',
					x: 1920 - portalWidth,
					y: 0,
					width: portalWidth,
					height: 1080,
					onclick: (e: MouseEvent) => this.player.ready.then(() => this.sceneManager.setScene('asemahalli1'))
				}
			],
			actors: [
				{
					actor: this.player,
					layer: 'walkway',
					x: 350,
					altX: {
						asemahalli1: 1400
					},
					y: 650 - 80
				},
				{
					actor: okru,
					layer: 'door',
					x: 660,
					y: 460
				},
				{
					actor: strazu,
					layer: 'door',
					x: 980,
					y: 460
				}
			]
		});

		this.gearpuzzle = new GearPuzzle();

		let gears = this.gearpuzzle.getCasts();
		gears.push({
			actor: new Actor({
				id: 'clockface',
				sheetUrl: 'assets/clockface_gearpuzzle.png',
				firstFrame: 0
			}),
			layer: 'puzzle',
			x: 142,
			y: 600
		});
		this.sceneManager.createScene({
			id: 'gearpuzzle',
			layers: [{
				url: 'assets/gearpuzzle_bg.png',
				id: 'background',
				depth: 100,
			}, {
				id: 'puzzle',
				depth: 200,
			}, {
				id: 'clock',
				depth: 250,
			}, {
				id: 'clockhands',
				depth: 300,
			}],
			things: [],
			actors: gears
		});

		this.sceneManager.setScene('asemahalli1');

		document.body.onclick = (e: MouseEvent) => {
			this.player.idling = false;
			this.player.walkTo(e.clientX / window.innerWidth * 1920 - 60, 100);
		};

		engineer.idle(0);
		seller.idle(0);
		okru.idle(0);
		strazu.idle(0);
		conductor.idle(0);
		conductor.sprite.div.style.transform = 'scaleX(-1)';
	}

	ui: UI;
	// animationManager: AnimationManager;
	sceneManager: SceneManager;
	player: Player;
	gearpuzzle: GearPuzzle;

}

new App();
