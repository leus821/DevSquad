import { cn } from '@/shared/lib/utils/commonUtils';
import { Check } from 'lucide-react';

const RoadMapStep = ({ isCompleted, className }) => {
	return (
		<div
			className={cn(
				'rounded-full border-primary border flex-all-center bg-background p-0.5 aspect-square',
				!isCompleted && 'p-2',
				className,
			)}
		>
			{isCompleted ? (
				<Check className='w-full h-full' />
			) : (
				<div className='rounded-full bg-primary w-full h-full'></div>
			)}
		</div>
	);
};

export default RoadMapStep;
