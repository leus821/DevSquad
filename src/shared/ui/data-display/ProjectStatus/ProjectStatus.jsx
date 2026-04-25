import { cn } from '@/shared/lib/utils/commonUtils';
import { PROJECT_STATUSES } from '@/shared/static/project';

const ProjectStatus = ({ status = 'idea', className }) => {
	const activeStatus = PROJECT_STATUSES[status];

	return (
		<div
			className={cn(
				'inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 pointer-events-auto',
				className,
			)}
		>
			<span className='text-orange-400'>{activeStatus?.component}</span>
			<span className='text-xs font-medium text-white'>
				{activeStatus?.label}
			</span>
		</div>
	);
};

export default ProjectStatus;
