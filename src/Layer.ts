import * as Promise from 'bluebird';

import { Pic } from './Pic';

/** Scene background layer. */

export interface LayerSpec {
	/** Image file URL. */
	url?: string;
	/** Optional layer name. */
	name?: string;
	/** Depth for z-order and maybe parallax effect. */
	depth: number;
}

export class Layer {

	constructor(spec: LayerSpec) {
		this.url = spec.url;
		this.depth = spec.depth;

		this.pic = new Pic();
		this.pic.image.classList.add('diorama-layer');
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
	/** Optional layer name. */
	name?: string;
	/** Width in pixels. */
	width: number;
	/** Height in pixels. */
	height: number;

	/** Depth for z-order and maybe parallax effect. */
	depth: number;
}
