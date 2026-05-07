import { Accordion } from '@/shared/ui/shadcn/accordion';
import {
	ProjectHeader,
	ProjectInfoBlock,
	TeamStack,
	VacancyAction,
	VacancyBlock,
} from '..';
import { TEAMLIST } from '@/shared/static';

const VacancyProject = ({ project, vacancy = null }) => {
	return (
		<section>
			<div className='mx-auto max-w-300 w-full'>
				<ProjectHeader
					slogan={project.slogan}
					links={project.links}
					projectName={project.name}
					status={project.status}
				/>
				<div className='grid grid-cols-14 gap-7'>
					<Accordion
						defaultValue={['project']}
						type='multiple'
						className='rounded-xl flex col-span-10 flex-col gap-7'
					>
						<ProjectInfoBlock
							idea={project.idea}
							description={project.description}
							approach={project.approach}
						/>
						{vacancy && <VacancyBlock vacancyProps={vacancy} />}
					</Accordion>
					<div className='col-span-4'>
						{vacancy && (
							<VacancyAction
								experience='Опыт от 1 года до 3 лет'
								role='Начинающий фронтенд разработчик'
							/>
						)}
						<TeamStack teamList={TEAMLIST} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default VacancyProject;
