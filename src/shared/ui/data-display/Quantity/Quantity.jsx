import { cn } from '@/shared/lib/utils/commonUtils';

const Quantity = ({ quantity = 0, outOf, text = '', className }) => {
	return (
		<span
			className={cn(
				'text-xs font-bold text-header-icons px-2 py-1 border border-card-border rounded-md',
				className,
			)}
		>
			{outOf ? `${quantity}/${outOf} ${text}` : quantity + ' ' + text}
		</span>
	);
};

export default Quantity;
