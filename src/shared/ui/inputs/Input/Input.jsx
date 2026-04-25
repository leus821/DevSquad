'use client';
import { forwardRef } from 'react';
import { cn } from '@/shared/lib/utils/commonUtils';
import { ErrorField, Quantity } from '@/shared/ui';

const Input = forwardRef(
	(
		{
			label,
			icon: Icon,
			error,
			className,
			required,
			watchValue,
			maxLength,
			...props
		},
		ref,
	) => {
		const handleKeyDown = e => {
			if (props.type === 'number' && ['-', '+', 'e', 'E'].includes(e.key)) {
				e.preventDefault();
			}
		};

		const currentLength = watchValue?.length || 0;

		return (
			<div className='w-full space-y-1.5'>
				<div className='flex items-center'>
					{label && (
						<label
							className={cn(
								'text-xs font-bold text-header-icons flex uppercase',
								Icon && 'ml-1',
							)}
						>
							{label}
							{required && (
								<span
									className='text-primary text-lg leading-none'
									title='Обязательное поле'
								>
									*
								</span>
							)}
						</label>
					)}
					{maxLength && (
						<Quantity
							className='uppercase font-bold text-[10px] tracking-widest ml-auto inline text-right'
							quantity={currentLength}
							outOf={maxLength}
							
						/>
					)}
				</div>
				<div className='relative group'>
					{Icon && (
						<Icon
							size={18}
							className={cn(
								'absolute left-4 top-1/2 -translate-y-1/2 transition-colors',
								error
									? 'text-red-500'
									: 'text-header-icons group-focus-within:text-brand-purple',
							)}
						/>
					)}
					<input
						{...props}
						maxLength={maxLength}
						ref={ref}
						onKeyDown={handleKeyDown}
						className={cn(
							'w-full bg-input border rounded-xl py-3 text-white outline-none transition-all',
							'focus:bg-black/40 placeholder:text-header-icons/50',
							Icon ? 'pl-11 pr-4' : 'px-4',
							error
								? 'border-red-500'
								: 'border-card-border focus:border-brand-purple',
							className,
						)}
					/>
				</div>
				{error && <ErrorField errorText={error.message} />}
			</div>
		);
	},
);
Input.displayName = 'Input';
export default Input;
