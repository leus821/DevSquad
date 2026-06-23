import { cn } from '@/shared/lib/utils/commonUtils';
import {
	SelectItem,
	Select,
	SelectTrigger,
	SelectContent,
	SelectValue,
	SelectGroup,
} from '@/shared/ui/shadcn/select';
import { ErrorField } from '@/shared/ui';

const SelectCustom = ({
	label,
	error,
	onChange,
	options,
	value,
	className,
	name,
}) => {
	return (
		<div className='w-full space-y-1.5'>
			{label && (
				<label className='text-xs font-bold text-header-icons uppercase ml-1 '>
					{label}
				</label>
			)}
			<Select
				value={value}
				instanceId={name || 'tech-stack-select'}
				onValueChange={onChange}
				className={cn(
					'w-full bg-input border rounded-xl py-3 px-4 text-white outline-none transition-all appearance-none cursor-pointer',
					'focus:border-brand-purple focus:bg-black/40 bg-amber-50',
					error ? 'border-red-500' : 'border-card-border',
					className,
				)}
			>
				<SelectTrigger
					className={cn(
						'w-full bg-input border rounded-xl py-6 px-4 text-white outline-none transition-all',
						'focus:ring-0 focus:ring-offset-0 focus:border-brand-purple ',
						error ? 'border-red-500' : 'border-card-border',
						className,
					)}
				>
					<SelectValue />
				</SelectTrigger>
				<SelectContent className='bg-input'>
					<SelectGroup>
						{options.map(item => (
							<SelectItem
								key={item.id}
								className='cursor-pointer not-last:mb-2'
								value={item.value}
							>
								{item.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			{error && <ErrorField errorText={error.message} />}
		</div>
	);
};

export default SelectCustom;
