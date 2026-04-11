import { ProjectLogo } from '@/entities/project';
import { TextLink, LinksList, ProjectStatus } from '@/shared/ui';
import { SquareArrowOutUpRight } from 'lucide-react';

const ProjectHeader = ({ isDashboard, children }) => {
	return (
		<div className='mb-10 rounded-2xl project-header-border'>
			<div className='flex gap-21.5 items-center relative pl-16 py-5 pr-8'>
				<ProjectLogo text='STUD' />
				<div>
					<div className='flex gap-10'>
						<h1 className='text-[50px] font-bold '>STUD HOME</h1>
					</div>
					<p className='text-front text-lg'>
						Платформа для прогноза погоды и управления умным домом и другими
						крутыми проектами
					</p>
				</div>

				<LinksList
					className='absolute bottom-2 right-5'
					links={[
						{ url: 'https://github.com/...' },
						{ url: 'https://my-site.pro' },
					]}
				/>
				<div className='flex absolute top-2 right-2 gap-3'>
					{isDashboard && (
						<TextLink
							className='text-base text-front'
							href={'/project/1'}
							icon={SquareArrowOutUpRight}
							label='На страницу'
						/>
					)}
					<ProjectStatus />
				</div>
			</div>
			{children && (
				<>
					<div className='h-px bg-card-border w-full' />
					<div className='px-8 py-4'>{children}</div>
				</>
			)}
		</div>
	);
};

export default ProjectHeader;
