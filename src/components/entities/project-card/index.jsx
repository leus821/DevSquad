import Button from '@/components/ui/Button';
import CardImage from '@/components/ui/CardImage';
import Skill from '@/components/ui/Skill';
import Link from 'next/link';

const ProjectCard = ({ projectProps, vacancyProps, type = 'feed' }) => {
	return (
		<article
			href='project'
			className='block bg-card border-card-border border-solid border-2 rounded-xl'
		>
			<CardImage />
			<div className='flex flex-[20%] px-3 py-1 items-stretch'>
				{/* Блок с проектом */}
				<div className='border-r-card-border border-r flex flex-col'>
					<h2 className='font-extrabold text-[18px]'>
						Приложение для прогноза погоды StudHome
					</h2>
					<p className='text-front text-sm mb-2'>
						Делаем Uber для выгула капибар. Есть готовое приложение на iOS, ищем
						технаря для фистинга
					</p>
					<div className='flex gap-x-2 mt-auto'>
						<Skill text='Rect' />
						<Skill text='Rect' />
						<Skill text='Rect' />
					</div>
				</div>
				{/* Правая колонка с вакансией */}
				<div className='flex-[71%] grow-0 ml-3 flex flex-col'>
					<div>
						<h2 className='font-medium'>Начинающий frontend разработчик</h2>
						<span className='block text-sm text-front'>Опыт от 1 года</span>
					</div>
					<Button className='mt-auto w-full'>Откликнуться</Button>
				</div>
			</div>
		</article>
	);
};

export default ProjectCard;
