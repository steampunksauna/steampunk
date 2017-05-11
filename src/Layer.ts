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
	offset?: number;
}

export class Layer {

	constructor(spec: LayerSpec) {
		this.url = spec.url;
		this.id = spec.id;
		this.depth = spec.depth;

		this.div = document.createElement('div');
		const pic = new Pic();
		this.div.appendChild(pic.image);
		pic.image.style.left = ((spec.offset || 0) / 1920 * 100) + '%';

		pic.image.classList.add('diorama-layer');
		if(this.url) pic.image.classList.add('diorama-background');
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

	div: HTMLDivElement;
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
