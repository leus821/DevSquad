import ProjectLinks from '@/components/entities/project/Links';
import ProjectStatus from '@/components/ui/project/ProjectStatus';
import TextLink from '@/components/ui/TextLink';
import { Link, SquareArrowOutUpRight } from 'lucide-react';

const ProjectHeader = ({ isDashboard, children }) => {
	return (
		<div className='mb-10 rounded-2xl project-header-border'>
			<div className='flex gap-21.5 items-center relative pl-16 py-5 pr-8'>
				<div className='w-45 flex-all-center aspect-square bg-black border-[#A78BFA] border-2 rounded-xl'>
					<h2 className='text-[50px] font-bold'>STUD</h2>
				</div>
				<div>
					<div className='flex gap-10'>
						<h1 className='text-[50px] font-bold '>STUD HOME</h1>
						{isDashboard && (
							<TextLink
								className='inline-flex text-base text-front'
								href={'/project/1'}
								icon={SquareArrowOutUpRight}
								label='На страницу'
							/>
						)}
					</div>
					<p className='text-front text-lg'>
						Платформа для прогноза погоды и управления умным домом и другими
						крутыми проектами
					</p>
				</div>
				<ProjectStatus className='absolute top-2 right-2' />
				<ProjectLinks
					className='absolute bottom-2 right-5'
					links={[
						{ url: 'https://github.com/...' },
						{ url: 'https://my-site.pro' },
					]}
				/>
			</div>
			{children && (
				<>
					{/* Разделительная линия */}
					<div className='h-[1px] bg-card-border w-full' />

					{/* Контент, который мы передадим (кнопки, команда, статы) */}
					<div className='px-8 py-4'>{children}</div>
				</>
			)}
		</div>
	);
};

export default ProjectHeader;
