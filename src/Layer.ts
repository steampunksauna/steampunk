import * as Promise from 'bluebird';

/** Scene background layer. */

export interface LayerSpec {
	url: string;
	depth: number;
}

export class Layer {

	constructor(spec?: LayerSpec) {
		const image = document.createElement('img');

		image.className = 'diorama-layer';

		image.addEventListener('load', (e: Event) => {
			this.width = image.width;
			this.height = image.height;

			this.onload(this);
		});

		image.addEventListener('error', (e: ErrorEvent) => {
			this.onerror(e.error);
		});

		this.image = image;
		this.spec = spec;
	}

	init() {
		return(this.load(this.spec!.url));
	}

	load(url: string) {
		return(new Promise((resolve, reject) => {
			this.url = url;
			this.image.src = url;
			this.onload = resolve;
			this.onerror = reject;
		}));
	}

	private onload: (layer: Layer) => void;
	private onerror: (reason: any) => void;

	spec?: LayerSpec;
	image: HTMLImageElement;

	/** Image file URL. */
	url: string;
	width: number;
	height: number;

	/** Depth for z-order and maybe parallax effect. */
	depth: number;
}
