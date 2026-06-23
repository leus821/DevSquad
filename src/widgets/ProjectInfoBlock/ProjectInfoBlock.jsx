import {
	ProjectGallery,
	ProjectTextInfo,
} from '@/entities/project';
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/ui/shadcn/accordion';

const ProjectInfoBlock = ({
	description,
	idea,
	approach,
	gallery,
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
				{gallery?.length > 0 && (
					<div className='pl-8 pr-6'>
						<h3 className='text-xl font-semibold mt-4 mb-2'>Галерея</h3>
						<ProjectGallery gallery={gallery} />
					</div>
				)}
			</AccordionContent>
		</AccordionItem>
	);
};

export default ProjectInfoBlock;
