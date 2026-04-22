'use client';
import { forwardRef } from 'react';
import { cn } from '@/shared/lib/utils/commonUtils';
import { ErrorField } from '@/shared/ui';

const Input = forwardRef(
	({ label, icon: Icon, error, className, ...props }, ref) => {
		const handleKeyDown = e => {
			if (props.type === 'number' && ['-', '+', 'e', 'E'].includes(e.key)) {
				e.preventDefault();
			}
		};

		return (
			<div className='w-full space-y-1.5'>
				{label && (
					<label
						className={cn(
							'text-xs font-bold text-header-icons uppercase',
							Icon && 'ml-1',
						)}
					>
						{label}
					</label>
				)}
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
						ref={ref}
						{...props}
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
