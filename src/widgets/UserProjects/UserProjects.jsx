import { ProjectCard } from '@/entities/project';

const UserProjects = ({ projects }) => {
	return (
		<div className='space-y-8'>
			<div className='flex items-center justify-between px-2'>
				<h3 className='text-white text-2xl font-black  '>Активные проекты</h3>
				<span className='text-xs font-bold text-header-icons uppercase tracking-widest'>
					Всего: {projects?.length}
				</span>
			</div>
			<ul className='grid grid-cols-1 gap-8'>
				{projects?.map(project => (
					<li key={project.id}>
						<ProjectCard project={project} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default UserProjects;
