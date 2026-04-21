'use client';

import { cn } from '@/shared/lib/utils/commonUtils';
import { X } from 'lucide-react'; // Для иконки удаления

const Skill = ({ skillName, className, onRemove, variant = 'purple' }) => {
	const variants = {
		// Твой основной фиолетовый (--brand-purple)
		purple: 'bg-brand-purple/10 border-brand-purple/20 text-brand-purple',
		// Твой серый для второстепенных штук (--color-header-icons)
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

			{onRemove && (
				<button
					type='button'
					onClick={e => {
						e.stopPropagation();
						onRemove();
					}}
					className='hover:text-white transition-colors -ml-1'
				>
					<X size={14} strokeWidth={2.5} />
				</button>
			)}
		</div>
	);
};

export default Skill;
