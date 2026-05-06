'use client';

import { useVacancyFeed, VacancyCard } from '@/entities/vacancy';

const VacancyFeed = () => {
	const { vacancies, isLoading } = useVacancyFeed();

	if (isLoading) return null;

	console.log(vacancies, isLoading);

	return (
		<div className='flex justify-between items-center py-5 mx-auto px-6'>
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
						projectId={item.projects.id}
					/>
				))}
			</div>
		</div>
	);
};

export default VacancyFeed;
