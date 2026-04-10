import { cn } from '@/lib/utils';

const StatItem = ({
	icon: Icon,
	value,
	label,
	color = 'text-header-icons',
	valueColor = 'text-white',
	className = '',
}) => {
	return (
		<div className={cn('flex items-center gap-2.5', className)}>
			{Icon && (
				<div className={`${color} shrink-0`}>
					<Icon size={18} strokeWidth={2.5} />
				</div>
			)}

			<div className='flex items-baseline gap-1.5 leading-none'>
				<span className={`text-base font-bold tracking-tight ${valueColor}`}>
					{value}
				</span>
				<span className='text-sm text-header-icons font-medium'>{label}</span>
			</div>
		</div>
	);
};

export default StatItem;
