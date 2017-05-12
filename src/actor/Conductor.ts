import { Script } from '../Dialog';
import { state } from '../State';

export const script: Script = {
	init: () => {
		return(Math.random() < 0.5 ? 'init1' : 'init2');
	},
	init1: {
		text: "No trains today! No refunds!",
		'OK': 'end'
	},
	init2: {
		text: "You need to get home? Too bad! No trains!",
		'OK': 'init3'
	},
	init3: {
		text: "There’s always the airship, but they’re not running either -",
		'OK': 'init4'
	},
	init4: {
		text: "Besides, no one gets out until they catch whoever did it!",
		'OK': 'end'
	},
}
