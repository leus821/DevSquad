import { cn } from '@/shared/lib/utils/commonUtils';
import { Trash2 } from 'lucide-react';

const RemoveButton = ({ className, type = 'colored', ...props }) => {
	return (
		<button
			{...props}
			type='button'
			className={cn(
				'p-2 hover:scale-110 transition-all rounded-xl',
				type !== 'colored'
					? ' text-header-icons hover:text-red-500 hover:bg-red-500/10 group-hover:opacity-100'
					: 'bg-red-500/80 hover:bg-red-500 backdrop-blur-md text-white ',
				className,
			)}
		>
			<Trash2 size={20} />
		</button>
	);
};

export default RemoveButton;
