import * as Promise from 'bluebird';

import { LoadState } from './Loader';

export class Pic {

	constructor() {
		// TODO: Add a containing div!
		const image = document.createElement('img');

		image.addEventListener('load', (e: Event) => {
			this.state = LoadState.READY;
			this.width = this.image.width;
			this.height = this.image.height;
			this.onload(this);
		});

		image.addEventListener('error', (e: ErrorEvent) => {
			this.state = LoadState.ERROR;
			this.onerror(e.error)
		});

		this.image = image;
	}

	load(url?: string) {
		if(url) {
			if(this.url == url) return(this.loaded);
			this.url = url;
			this.state = LoadState.LOADING;
		}

		this.loaded = new Promise<Pic>((resolve, reject) => {
			if(!url) return(resolve(this));

			this.onload = resolve;
			this.onerror = reject;
			this.image.src = url;
		});

		return(this.loaded);
	}

	private onload: (pic: Pic) => void;
	private onerror: (reason: any) => void;

	url: string;
	image: HTMLImageElement;
	state = LoadState.INIT;
	loaded: Promise<Pic>;

	width: number;
	height: number;

}
