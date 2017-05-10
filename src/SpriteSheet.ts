import * as Promise from 'bluebird';

import { Pic } from './Pic';

export class SpriteSheet {

	constructor(url: string) {
		this.url = url;
		this.pic = new Pic();
	}

	load() {
		return(this.pic.load(this.url).then((pic: Pic) => {
			// TODO: What if the picture contains multiple sheets
			// with sprites of different sizes?
			// Need to specify sheet size and offset.
			this.width = pic.image.width;
			this.height = pic.image.height;
			return(this);
		}));
	}

	/** Source picture. */
	pic: Pic;

	/** Image file URL. */
	url: string;
	/** Source picture pixel width, should be a multiple of cols. */
	width: number;
	/** Source picture pixel height, should be a multiple of rows. */
	height: number;

	/** Pixels from picture left edge to first frame. */
	offsetX = 0;
	/** Pixels from picture top edge to first frame. */
	offsetY = 0;

	/** Number of rows of frames in the source picture. */
	rows = 1;
	/** Number frames per row in the source picture. */
	cols = 1;

}
