import { cn } from '@/lib/utils';

const Skill = ({ text, className }) => {
	return <div className={cn('bg-primary/10 text-center px-4 rounded-full text-sm font-mono', className)}>{text}</div>;
};

export default Skill;
