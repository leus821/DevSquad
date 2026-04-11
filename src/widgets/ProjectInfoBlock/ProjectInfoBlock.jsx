import {
	ProjectGallery,
	ProjectRoadMap,
	ProjectTextInfo,
} from '@/entities/project';
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/ui/shadcn/accordion';

const steps = [
	{
		number: 1,
		date: 'Июнь 2023',
		status: 'Идея',
		isCompleted: true,
		isActive: false,
	},
	{
		number: 2,
		date: 'Июнь 2023',
		status: 'MVP',
		isCompleted: false,
		isActive: true,
	},
	{
		number: 3,
		date: 'Июнь 2023',
		status: 'Запущен',
		isCompleted: false,
		isActive: false,
	},
];

const ProjectInfoBlock = ({
	description,
	idea,
	approach,
	gallery,
	roadmap,
}) => {
	return (
		<AccordionItem
			value='project'
			className='rounded-2xl bg-card border-card-border border-2'
		>
			<AccordionTrigger className='font-bold text-2xl pl-8 pr-6'>
				О проекте
			</AccordionTrigger>
			<AccordionContent>
				<ProjectTextInfo
					idea={idea}
					approach={approach}
					description={description}
				/>
				<div className='pl-8 pr-6'>
					<h3 className='text-xl font-semibold mt-4 mb-2'>Галерея</h3>
					<ProjectGallery />
				</div>
				<ProjectRoadMap steps={steps} />
			</AccordionContent>
		</AccordionItem>
	);
};

export default ProjectInfoBlock;
