import { ProjectStatus, Skill } from '@/shared/ui';
import { ArrowRight, Globe } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils/commonUtils';

const ProjectCard = ({ project, className }) => {
	const { id, name, slogan, logo_url, tech_stack = [], status } = project;

	return (
		<Link
			className={cn(
				'group flex flex-col bg-card border-2 border-card-border rounded-4xl overflow-hidden transition-all duration-500 hover:border-brand-purple/40 hover:shadow-[0_20px_50px_-20px_rgba(99,102,241,0.2)]',
				className,
			)}
			href={`/project/${id}`}
		>
			<div className='relative aspect-video w-full overflow-hidden bg-black/40 flex items-center justify-center'>
				{logo_url ? (
					<img
						src={logo_url}
						alt=''
						className='absolute inset-0 w-full h-full object-cover blur-3xl opacity-20 scale-150 transition-transform duration-700 group-hover:scale-125'
					/>
				) : (
					<div className='absolute inset-0 bg-linear-to-br from-brand-purple/10 to-transparent' />
				)}

				<div className='relative z-10 w-24 h-24 md:w-28 md:h-28 bg-black border-2 border-white/5 rounded-[28px] flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110 overflow-hidden'>
					{logo_url ? (
						<img
							src={logo_url}
							className='w-full h-full object-cover'
							alt='Project Logo'
						/>
					) : (
						<Globe size={40} className='text-brand-purple/20' />
					)}
				</div>

				<ProjectStatus
					status={status}
					className='absolute top-4 right-4 z-20'
				/>
			</div>

			<div className='p-6 flex flex-col grow'>
				<div className='mb-4'>
					<h3 className='text-xl font-black text-white group-hover:text-brand-purple transition-colors uppercase leading-tight'>
						{name || 'Без названия'}
					</h3>
					<p className='text-sm text-header-icons font-medium mt-1 line-clamp-1'>
						{slogan || 'Описание проекта отсутствует'}
					</p>
				</div>

				{tech_stack.length > 0 && (
					<div className='flex flex-wrap gap-2 mb-6'>
						{tech_stack?.slice(0, 3).map(skill => (
							<Skill
								key={skill}
								skillName={skill}
								variant='gray'
								className='px-2.5 py-0.5 text-[9px] border-white/5 bg-white/5'
							/>
						))}
						{tech_stack?.length > 3 && (
							<span className='text-[10px] text-header-icons font-bold self-center ml-1'>
								+{tech_stack.length - 3}
							</span>
						)}
					</div>
				)}
			</div>
		</Link>
	);
};

export default ProjectCard;
