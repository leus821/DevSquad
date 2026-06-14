import { Accordion } from '@/shared/ui/shadcn/accordion';
import {
	ProjectHeader,
	ProjectInfoBlock,
	TeamStack,
	VacancyAction,
	VacancyBlock,
} from '..';

const VacancyProject = ({ project, vacancy = null }) => {
	const team = project.members || [];
	
	return (
		<section>
			<div className='mx-auto max-w-300 w-full'>
				<ProjectHeader
					slogan={project.slogan}
					links={project.links}
					projectName={project.name}
					status={project.status}
					projectId={project.id} // Добавили на всякий случай
				/>
				<div className='grid grid-cols-14 gap-7'>
					<Accordion
						defaultValue={['project', 'vacancy']}
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
								experience={vacancy.experience} // Берем реальный опыт
								role={vacancy.role}             // Берем реальную роль
								responses={vacancy.applicants?.length} // Реальное кол-во откликов
								vacancyId={vacancy.id}          // ПЕРЕДАЕМ ID
								projectId={project.id}          // ПЕРЕДАЕМ ID ПРОЕКТА
							/>
						)}
						<TeamStack teamList={team} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default VacancyProject;