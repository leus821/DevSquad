import { cn } from '@/shared/lib/utils/commonUtils';

const TextLink = ({
	children,
	href,
	icon: Icon,
	className = '',
	label = '',
	...props
}) => {
	return (
		<a
			{...props}
			href={href}
			className={cn(
				'flex items-center gap-1.5 text-sm font-medium text-header-icons hover:text-white transition-colors duration-200 group',
				className,
			)}
		>
			<span className='underline-offset-4 group-hover:underline'>{label}</span>
			{Icon && (
				<Icon
					size={20}
					className='group-hover:translate-x-0.5 transition-transform'
				/>
			)}
		</a>
	);
};

export default TextLink;
