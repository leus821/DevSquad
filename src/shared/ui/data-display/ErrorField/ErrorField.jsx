import { cn } from '@/shared/lib/utils/commonUtils';

const ErrorField = ({ className, errorText }) => {
	return (
		<p
			className={cn(
				'text-[10px] text-red-500 ml-1 font-medium animate-in fade-in slide-in-from-top-1',
				className,
			)}
		>
			{errorText}
		</p>
	);
};

export default ErrorField;
