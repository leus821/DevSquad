import { cn } from '@/lib/utils';

const Input = ({ label, icon: Icon, error, className, id, ...props }) => {
	return (
		<div className='w-full space-y-1.5'>
			{label && (
				<label
					htmlFor={id}
					className='text-xs font-bold text-header-icons uppercase tracking-wider ml-1'
				>
					{label}
				</label>
			)}

			<div className='relative group'>
				{Icon && (
					<Icon
						size={18}
						className='absolute left-4 top-1/2 -translate-y-1/2 text-header-icons group-focus-within:text-brand-purple transition-colors'
					/>
				)}

				<input
					id={id}
					className={cn(
						'w-full bg-input border border-card-border rounded-xl py-3 text-white outline-none transition-all',
						'focus:border-brand-purple focus:bg-black/40 placeholder:text-header-icons/50',
						Icon ? 'pl-11 pr-4' : 'px-4', // Если есть иконка — делаем отступ слева
						error ? 'border-red-500' : 'border-card-border',
						className,
					)}
					{...props}
				/>
			</div>

			{error && (
				<p className='text-[10px] text-red-500 ml-1 font-medium'>{error}</p>
			)}
		</div>
	);
};

export default Input;
