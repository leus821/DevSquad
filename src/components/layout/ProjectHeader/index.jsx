import ProjectStatus from '@/components/ui/project/ProjectStatus';

const ProjectHeader = () => {
	return (
		<div className='flex gap-21.5 items-center relative pl-16 py-5 pr-8 rounded-2xl mb-10 project-header-border'>
			<div className='w-45 flex-all-center aspect-square bg-black border-[#A78BFA] border-2 rounded-xl'>
				<h2 className='text-[50px] font-bold'>STUD</h2>
			</div>
			<div>
				<h1 className='text-[50px] font-bold'>STUD HOME</h1>
				<p className='text-front text-lg'>
					Платформа для прогноза погоды и управления умным домом и другими
					крутыми проектами
				</p>
			</div>
			<ProjectStatus className='absolute top-2 right-2' />
		</div>
	);
};

export default ProjectHeader;
