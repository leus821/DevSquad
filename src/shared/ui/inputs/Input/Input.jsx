'use client';

import { cn } from '@/shared/lib/utils/commonUtils';

const Input = ({
	label,
	icon: Icon,
	error,
	registration,
	className,
	...props
}) => {
	return (
		<div className='w-full space-y-1.5'>
			{label && (
				<label className='text-xs font-bold text-header-icons uppercase ml-1'>
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
					{...registration}
					{...props}
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

			{error && (
				<p className='text-[10px] text-red-500 ml-1 font-medium animate-in fade-in slide-in-from-top-1'>
					{error.message}
				</p>
			)}
		</div>
	);
};

export default Input;
