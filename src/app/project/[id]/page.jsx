'use client';

import ProjectAbout from '@/components/layout/ProjectAbout';
import ProjectHeader from '@/components/layout/ProjectHeader';
import ProjectVacancy from '@/components/layout/ProjectVacancy';
import VacancyAction from '@/components/layout/VacancyAction';
import { Accordion } from '@/components/ui/shadcn/accordion';

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
						className='w-[70%] rounded-xl flex flex-col gap-7'
					>
						<ProjectAbout
							idea='Мы хотим создать самый красивый и быстрый трекер привычек на React Native. Без рекламы, с открытым кодом и фокусом на минимализме'
							description='StudHome - Проект где все обращается в реальность, присоединяйся к нам'
							approach='Каждый год тысячи студентов тратят недели на поиск жилья, сталкиваясь с мошенниками и переплатами..'
						/>
						<ProjectVacancy vacancyProps={vacancyProps} />
					</Accordion>
					<VacancyAction
						experience='Опыт от 1 года до 3 лет'
						role='Начинающий фронтенд разработчик'
					/>
				</div>
			</div>
		</section>
	);
};

export default ProjectPage;
