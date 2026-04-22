'use client';

import { cn } from '@/shared/lib/utils/commonUtils';
import { X } from 'lucide-react'; // Для иконки удаления

const Skill = ({ skillName, className, variant = 'purple' }) => {
	const variants = {
		purple: 'bg-brand-purple/10 border-brand-purple/20 text-brand-purple',
		gray: 'bg-white/5 border-card-border text-header-icons',
	};

	return (
		<div
			className={cn(
				'inline-flex items-center gap-2 px-4 py-1 rounded-full border',
				'text-sm font-mono whitespace-nowrap transition-all duration-200',
				variants[variant],
				className,
			)}
		>
			<span>{skillName}</span>

			<button
				type='button'
				className='hover:text-white transition-colors -ml-1'
			>
				<X size={14} strokeWidth={2.5} />
			</button>
		</div>
	);
};

export default Skill;
