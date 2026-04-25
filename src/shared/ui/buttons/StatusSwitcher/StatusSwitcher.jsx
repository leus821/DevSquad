import { cn } from '@/shared/lib/utils/commonUtils';
import { PROJECT_STATUSES_ARRAY } from '@/shared/static/project';

const StatusSwitcher = ({ activeValue = 'idea', onClick, className }) => {
	return (
		<div
			className={cn(
				'flex gap-2 p-1 rounded-xl border border-card-border bg-black/20',
				className,
			)}
		>
			{PROJECT_STATUSES_ARRAY.map(status => (
				<button
					key={status.id}
					onClick={() => onClick(status.id)}
					type='button'
					className={cn(
						'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
						{
							'bg-card-border text-white': status.id === activeValue,
						},
					)}
				>
					{status.label}
				</button>
			))}
		</div>
	);
};

export default StatusSwitcher;
