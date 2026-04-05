import { cn } from '@/lib/utils';
import { Hammer, Lightbulb, Rocket } from 'lucide-react';

const statuses = {
	idea: {
		text: 'Идея',
		component: <Lightbulb className='text-yellow-300 fill-current w-5' />,
	},

	MVP: {
		text: 'MVP',
		component: <Hammer className='text-green-300 fill-current w-5' />,
	},

	launched: {
		text: 'Запущен',
		component: <Rocket className='text-red-300 fill-current w-5' />,
	},
};

const ProjectStatus = ({ status = 'idea', className }) => {
	const activeStatus = statuses[status];

	return (
		<div
			className={cn(
				'absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 pointer-events-auto',
				className,
			)}
		>
			<span className='text-orange-400'>{activeStatus?.component}</span>
			<span className='text-xs font-medium text-white'>
				{activeStatus?.text}
			</span>
		</div>
	);
};

export default ProjectStatus;
