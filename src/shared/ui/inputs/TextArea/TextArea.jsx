'use client';

import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/shared/lib/utils/commonUtils';
import { ErrorField, Quantity } from '@/shared/ui';

const TextArea = ({
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
				<TextareaAutosize
					{...props}
					maxLength={maxLength}
					maxRows={20}
					className={cn(
						'w-full min-h-50 bg-black/20 border rounded-2xl p-5 text-white outline-none transition-all leading-relaxed',
						error
							? 'border-red-500'
							: 'border-card-border focus:border-brand-purple',
						className,
					)}
				/>
				<div className='flex items-center justify-between'>
					{error && <ErrorField errorText={error.message} />}
					<Quantity
						className={cn(
							'uppercase font-bold text-[10px] tracking-widest ml-auto inline text-right',
							currentLength >= maxLength
								? 'text-red-500 border border-red-500'
								: 'text-header-icons ',
						)}
						quantity={currentLength}
						outOf={maxLength}
						text='символов'
					/>
				</div>
			</div>
		</div>
	);
};

export default TextArea;
