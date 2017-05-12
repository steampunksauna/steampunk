import { Script } from '../Dialog';
import { state } from '../State';

export const script: Script = {
	init: () => 'init1',
	init1: {
		text: "Privet, moi. Oh, you don't have money.",
		'...': 'init2'
	},
	init2: {
		text: "Such a day, such a day. Well.",
		'...': 'init3'
	},
	init3: {
		text: "What a day. No one wants my papers now-",
		'...': 'init4'
	},
	init4: {
		text: "Well, it's not everyday the Tsar gets- Well.",
		'...': 'init5'
	},
	init5: {
		text: "You know. And here of all places. Well.",
		'...': 'init6'
	},
	init6: {
		text: "I heard the killer is a huge dark man. Well.",
		'...': 'init7'
	},
	init7: {
		text: "Too bad it's not in my papers. Sigh.",
		'OK': 'end'
	}
}
