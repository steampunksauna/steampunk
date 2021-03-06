import { Script } from '../Dialog';
import { state } from '../State';

export const script: Script = {
	init: () => {
		if(state.talkedToMirka) {
			return(Math.random() < 0.5 ? 'idle1' : 'idle2');
		} else {
			state.talkedToMirka = true;
			return('init1');
		}
	},
	init1: {
		text: "Lunch! Thank- oh. You're not here with my lunch.",
		'...': 'init2'
	},
	init2: {
		text: "Of course. Well <i>obviously</i> there's no lunch on a day like this.",
		'...': 'init3'
	},
	init3: {
		text: "(I hate this boring job, first the voles and now this -)",
		'...': 'init4'
	},
	init4: {
		text: "I mean, praise the tsar! Uh-or whatever we should say now -",
		'...': 'init5'
	},
	init5: {
		text: "You wouldn't happen to mind getting me something to read?",
		'...': 'init6'
	},
	init6: {
		text: "Here's 20 Kopeck, it should be enough. Sigh...",
		'...': 'init7'
	},
	init7: {
		text: "<i>You received 20 Kopeck from Mirka.</i>",
		event: () => { state.money += 20; },
		'OK': 'end'
	},
	idle1: {
		text: "Please- please let me out of here... Sorry, don’t mind me.",
		'OK': 'end'
	},
	idle2: {
		text: "I'm so bored. There isn’t even anything for me to watch here.",
		'OK': 'idle3'
	},
	idle3: {
		text: "Well, besides that weird machine, but no one knows how to use it.",
		'OK': 'end'
	}
}
