'use client';

import {
	VacancyBlock,
	ProjectInfoBlock,
	TeamStack,
	VacancyAction,
	ProjectHeader,
} from '@/widgets';
import { Accordion } from '@/shared/ui/shadcn/accordion';
import { TEAMLIST } from '@/shared/static/mock_data';

const vacancyProps = {
	skills: ['react', 'node.js', 'node.js', 'node.js'],
};

const ProjectPage = () => {
	return (
		<section>
			<div className='mx-auto max-w-300 w-full'>
				<ProjectHeader />
				<div className='flex gap-7'>
					<Accordion
						type='multiple'
						className='flex-[80%] rounded-xl flex flex-col gap-7'
					>
						<ProjectInfoBlock
							idea='Мы хотим создать самый красивый и быстрый трекер привычек на React Native. Без рекламы, с открытым кодом и фокусом на минимализме'
							description='StudHome - Проект где все обращается в реальность, присоединяйся к нам'
							approach='Каждый год тысячи студентов тратят недели на поиск жилья, сталкиваясь с мошенниками и переплатами..'
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
