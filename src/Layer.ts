import * as Promise from 'bluebird';

import { Pic } from './Pic';

/** Scene background layer. */

export interface LayerSpec {
	/** Image file URL. */
	url?: string;
	/** Optional layer name. */
	id?: string;
	/** Depth for z-order and maybe parallax effect. */
	depth: number;
}

export class Layer {

	constructor(spec: LayerSpec) {
		this.url = spec.url;
		this.id = spec.id;
		this.depth = spec.depth;

		const pic = new Pic();

		pic.image.classList.add('diorama-layer');
		pic.image.style.zIndex = '' + this.depth;

		this.pic = pic;
	}

	load(url?: string) {
		return(this.pic.load(url || this.url).then((pic: Pic) => {
			if(pic) {}
			this.width = pic.width;
			this.height = pic.height;
			return(this);
		}));
	}

	pic: Pic;

	/** Image file URL. */
	url?: string;
	/** Optional layer ID. */
	id?: string;
	/** Width in pixels. */
	width: number;
	/** Height in pixels. */
	height: number;

	/** Depth for z-order and maybe parallax effect. */
	depth: number;
}
