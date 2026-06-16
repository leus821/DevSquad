import { Hammer, Lightbulb, Rocket } from 'lucide-react';

export const PROJECT_STATUSES = {
	idea: {
		id: 'idea',
		label: 'Идея',
		component: <Lightbulb className='text-yellow-300 fill-current w-5' />,
	},

	mvp: {
		id: 'mvp',
		label: 'MVP',
		component: <Hammer className='text-green-300 fill-current w-5' />,
	},

	launched: {
		id: 'launched',
		label: 'Запущен',
		component: <Rocket className='text-red-300 fill-current w-5' />,
	},
};

export const PROJECT_STATUSES_ARRAY = [
	{ ...PROJECT_STATUSES.idea },
	{ ...PROJECT_STATUSES.mvp },
	{ ...PROJECT_STATUSES.launched },
];

export const PROJECT_INPUTS_MAX_LENGTH = {
	name: 50,
	slogan: 100,
};
