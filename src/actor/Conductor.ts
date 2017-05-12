import { Script } from '../Dialog';
import { state } from '../State';

export const script: Script = {
	init: () => 'init1',
	init1: {
		text: "No trains today! No refunds!",
		'OK': 'end'
	}
}
