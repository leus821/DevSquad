'use client';

import { useParams } from 'next/navigation';
import { useProjectDetails } from '@/entities/project';
import {
	VacancyBlock,
	ProjectInfoBlock,
	TeamStack,
	VacancyAction,
	ProjectHeader,
} from '@/widgets';
import { Accordion } from '@/shared/ui/shadcn/accordion';
import { TEAMLIST } from '@/shared/static/mock_data';
import { Loader2 } from 'lucide-react';

const vacancyProps = {
	skills: ['react', 'node.js', 'node.js', 'node.js'],
};

const ProjectPage = () => {
	const { id } = useParams();
	const { project, loading, error } = useProjectDetails(id);

	if (loading) {
		return (
			<div className='min-h-screen flex flex-all-center'>
				<Loader2 className='animate-spin text-brand-purple' size={40} />
			</div>
		);
	}

	return (
		<section>
			<div className='mx-auto max-w-300 w-full'>
				<ProjectHeader
					slogan={project.slogan}
					links={project.links}
					projectName={project.name}
					status={project.status}
				/>
				<div className='flex gap-7'>
					<Accordion
						type='multiple'
						className='flex-[80%] rounded-xl flex flex-col gap-7'
					>
						<ProjectInfoBlock
							idea={project.idea}
							description={project.description}
							approach={project.approach}
						/>
						<VacancyBlock vacancyProps={vacancyProps} />
					</Accordion>
					<div>
						<VacancyAction
							experience='Опыт от 1 года до 3 лет'
							role='Начинающий фронтенд разработчик'
						/>
						<TeamStack teamList={TEAMLIST} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProjectPage;
