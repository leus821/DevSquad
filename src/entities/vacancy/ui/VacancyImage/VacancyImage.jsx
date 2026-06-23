import { cn } from '@/shared/lib/utils/commonUtils';
import { ProjectStatus } from '@/shared/ui';

const VacancyImage = ({ imageUrl, status, projectName, className }) => {
	if (imageUrl) {
		return (
			<div className='relative w-full aspect-16/7 overflow-hidden rounded-t-xl bg-slate-900'>
				<img
					src={imageUrl}
					className='absolute inset-0 w-full h-full object-cover blur-md opacity-80 brightness-110 scale-125'
					alt='background blur'
				/>
				<img
					src={imageUrl}
					className='relative w-full h-full object-contain'
					alt='project preview'
				/>

				<ProjectStatus status={status} />
			</div>
		);
	}

	return (
		<div
			className={cn(
				'relative aspect-16/7 overflow-hidden rounded-2xl border border-card-border',
				'bg-linear-to-br from-primary via-[#4f46e5] to-[#1e1b4b]',
				'flex items-center justify-center p-6',
				className,
			)}
		>
			<span className='text-white/20 font-black text-6xl uppercase select-none break-all text-center leading-none'>
				{projectName}
			</span>

			<div className='absolute inset-0 bg-black/10 backdrop-blur-[1px]' />
		</div>
	);
};

export default VacancyImage;
