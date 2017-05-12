import { Script } from '../Dialog';
import { state } from '../State';

export const script: Script = {
	init: () => 'init1',
	init1: {
		name: 'Guard Okhrannik',
		text: "Privet! Papers, please!",
		'...': 'init2'
	},
	init2: {
		name: 'Guard Strazhnnik',
		text: "Okru! You can’t go around all privet to passengers!",
		'...': 'init3'
	},
	init3: {
		name: 'Guard Okhrannik',
		text: "What am I supposed to say then, Strazu?",
		'...': 'init4'
	},
	init4: {
		name: 'Guard Strazhnnik',
		text: "Nothing, Okru! We can’t talk about this right now!",
		'...': 'init5'
	},
	init5: {
		name: 'Guard Okhrannik',
		text: "Aye aye, Strazu",
		'...': 'init6'
	},
	init6: {
		name: 'Guard Strazhnnik',
		text: "Okru...!",
		'OK': 'end'
	}
}
