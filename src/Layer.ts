import * as Promise from 'bluebird';

import { Pic } from './Pic';

/** Scene background layer. */

export interface LayerSpec {
	url?: string;
	depth: number;
}

export class Layer {

	constructor(spec: LayerSpec) {
		this.url = spec.url;
		this.depth = spec.depth;

		this.pic = new Pic();
		this.pic.image.className = 'diorama-layer';
	}

	load(url?: string) {
		return(this.pic.load(url || this.url).then((pic: Pic) => {
			this.width = pic.image.width;
			this.height = pic.image.height;
			return(this);
		}));
	}

	pic: Pic;

	/** Image file URL. */
	url?: string;
	width: number;
	height: number;

	/** Depth for z-order and maybe parallax effect. */
	depth: number;
}
