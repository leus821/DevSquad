import { ProjectLogo } from '@/entities/project';
import { TextLink, LinksList, ProjectStatus } from '@/shared/ui';
import { SquareArrowOutUpRight } from 'lucide-react';

const ProjectHeader = ({
	isDashboard,
	children,
	projectName = '',
	links,
	slogan,
	status,
	projectId,
	logo,
}) => {
	return (
		<div className='mb-10 rounded-2xl project-header-border'>
			<div className='flex gap-10 items-center relative pl-16 py-6 pr-8'>
				<ProjectLogo url={logo} text={projectName} />
				<div className='w-full min-w-0'>
					<div className='flex gap-10'>
						<h1 className='text-[50px] w-full leading-14 font-bold wrap-break-word'>
							{projectName}
						</h1>
					</div>
					<p className='text-front text-lg wrap-break-word w-[80%]'>{slogan}</p>
				</div>

				<LinksList className='absolute bottom-2 right-5' links={links} />
				<div className='flex absolute top-1 right-1 gap-3'>
					{isDashboard && (
						<TextLink
							className='text-base text-front'
							href={`/project/${projectId}`}
							icon={SquareArrowOutUpRight}
							label='На страницу'
						/>
					)}
					<ProjectStatus status={status} />
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
