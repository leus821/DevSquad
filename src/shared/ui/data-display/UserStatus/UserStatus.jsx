import { cn } from '@/shared/lib/utils/commonUtils';
import { STATUS_CONFIG } from '@/shared/static/statuses';

const UserStatus = ({ status = 'search', className }) => {
	const config = STATUS_CONFIG[status] || STATUS_CONFIG.search;

	return (
		<div
			className={cn(
				'inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border bg-black/20 backdrop-blur-sm transition-all',
				config.borderColor,
				config.glow,
				className,
			)}
		>
			{}
			<div className='relative flex h-2 w-2'>
				<span
					className={cn(
						'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
						config.color,
					)}
				></span>
				<span
					className={cn(
						'relative inline-flex rounded-full h-2 w-2',
						config.color,
					)}
				></span>
			</div>

			<span
				className={cn('text-[14px] font-semibold uppercase', config.textColor)}
			>
				{config.label}
			</span>
		</div>
	);
};

export default UserStatus;
