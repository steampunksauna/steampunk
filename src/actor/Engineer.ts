import { Script } from '../Dialog';
import { state } from '../State';

export const script: Script = {
	init: () => 'init1',
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
		'OK': 'end'
	}
}
