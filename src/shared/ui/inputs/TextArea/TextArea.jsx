import { cn } from '@/shared/lib/utils/commonUtils';

const TextArea = ({
	registration,
	error,
	maxLength = 2000,
	watchValue = '',
	className,
	...props
}) => {
	const currentLength = watchValue?.length || 0;

	return (
		<div className='w-full space-y-1.5'>
			<div className='relative'>
				<textarea
					{...registration}
					{...props}
					maxLength={maxLength}
					className={cn(
						'w-full min-h-50 bg-black/20 border rounded-2xl p-5 text-white outline-none transition-all resize-none leading-relaxed',
						error
							? 'border-red-500'
							: 'border-card-border focus:border-brand-purple',
						className,
					)}
				/>
				<p
					className={cn(
						'text-[10px] uppercase font-bold mt-1 text-right tracking-widest',
						currentLength >= maxLength ? 'text-red-500' : 'text-header-icons',
					)}
				>
					{currentLength} / {maxLength} символов
				</p>
			</div>

			{error && (
				<p className='text-[10px] text-red-500 ml-1 font-medium animate-in fade-in'>
					{error.message}
				</p>
			)}
		</div>
	);
};

export default TextArea;
