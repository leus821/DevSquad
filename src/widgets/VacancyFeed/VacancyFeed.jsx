'use client';

import { useVacancyFeed, VacancyCard } from '@/entities/vacancy';
import VacancyFilters from '../VacancyFilters/VacancyFilters';

const VacancyFeed = () => {
	const { vacancies, isLoading, filters, setFilters, resetFilters } = useVacancyFeed();

	if (isLoading) return null;

	return (
		<div className='py-5 mx-auto px-6'>
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-3xl font-bold'>Вакансии</h1>
				<VacancyFilters
					filters={filters}
					onChange={setFilters}
					onReset={resetFilters}
				/>
			</div>
			{vacancies.length === 0 ? (
				<p className='text-header-icons text-center py-20 text-lg'>
					По вашему запросу ничего не найдено
				</p>
			) : (
				<div className='grid grid-cols-3 gap-x-8 gap-y-5'>
					{vacancies.map(item => (
						<VacancyCard
							key={item.id}
							projectTitle={item.projects.name}
							description={item.hook}
							imageUrl={item.thumbnail_url}
							status={item.projects.status}
							vacancyRole={item.role || 'Роль не указана'}
							vacancyExperience={item.experience || 'Без опыта'}
							skills={item.stack}
							vacancyId={item.id}
							projectId={item.project_id}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default VacancyFeed;
