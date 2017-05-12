import { Script } from '../Dialog';
import { state } from '../State';

export const script: Script = {
	init: () => {
		if(!state.money) {
			return('init1');
		} else if(!state.paperCount) {
			return('buy1');
		} else {
			return('buy6');
		}
	},
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
	},
	buy1: {
		text: "Privet, moi!",
		'...': 'buy2'
	},
	buy2: {
		text: "You- you want a newspaper!",
		'...': 'buy3'
	},
	buy3: {
		text: "Here! Take them all! All free!",
		'Take paper': 'buy4'
	},
	buy4: {
		text: "Well, they don’t- they don’t contain the, well",
		event: () => { ++state.paperCount; },
		'...': 'buy5'
	},
	buy5: {
		text: "The story. I heard the killer stole someone’s coat and glasses...",
		'OK': 'end'
	},
	buy6: {
		text: "Well! Did you want anything else?",
		'Cigar 5': 'buy7',
		'No': 'end'
	},
	buy7: {
		text: "<i>You receive a cigar from Timo.</i>",
		event: () => { ++state.cigarCount; },
		'OK': 'end'
	}
}
