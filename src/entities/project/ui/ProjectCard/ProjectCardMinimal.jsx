import Link from 'next/link';
import { ProjectStatus } from '@/shared/ui';
import { ChevronRight, Briefcase } from 'lucide-react';

const ProjectCardMinimal = ({ project, userId }) => {
    

    const memberData = project.members?.find(m => String(m.user_id) === String(userId));
    
    const myRole = memberData ? memberData.role : 'Владелец';

	return (
		<Link 
			href={`/project/${project.id}`}
			className='group flex items-center justify-between p-4 bg-card border border-card-border rounded-2xl hover:border-brand-purple/40 transition-all'
		>
			<div className='flex items-center gap-4 min-w-0'>
                {}
                <div className='w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple shrink-0'>
                    <Briefcase size={20} />
                </div>

				<div className='flex flex-col min-w-0'>
					<div className='flex items-center gap-2'>
						<h4 className='font-bold text-white uppercase text-sm truncate'>
							{project.name}
						</h4>
						<ProjectStatus status={project.status} className="scale-75 origin-left" />
					</div>
					<p className='text-[11px] text-header-icons truncate'>
						Твоя роль: <span className='text-brand-purple font-bold'>{myRole}</span>
					</p>
				</div>
			</div>

			<div className='flex items-center gap-3 shrink-0'>
				<div className='p-2 rounded-lg bg-white/5 text-header-icons group-hover:text-white transition-colors'>
					<ChevronRight size={18} />
				</div>
			</div>
		</Link>
	);
};

export default ProjectCardMinimal;