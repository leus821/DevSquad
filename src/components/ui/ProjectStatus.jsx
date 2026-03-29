import { cn } from '@/lib/utils';
import { Lightbulb } from 'lucide-react';

const ProjectStatus = ({ status, className }) => {
	return (
		<div
			className={cn(
				'absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 pointer-events-auto',
				className,
			)}
		>
			<span className='text-orange-400'>
				<Lightbulb className='text-yellow-300 fill-current w-5' />
			</span>
			<span className='text-xs font-medium text-white'>Идея</span>
		</div>
	);
};

export default ProjectStatus;
