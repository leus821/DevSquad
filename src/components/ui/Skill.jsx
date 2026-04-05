import { cn } from '@/lib/utils';

const Skill = ({ skillName, className }) => {
	return (
		<div
			className={cn(
				'bg-primary/10 text-center px-4 rounded-full text-sm font-mono whitespace-nowrap',
				className,
			)}
		>
			{skillName}
		</div>
	);
};

export default Skill;
