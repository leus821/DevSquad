import { Card } from '@/widgets';
import { supabase } from '@/shared/lib/supabase';

const Home = async () => {
	const { data: projects, error } = await supabase
		.from('projects')
		.select(
			`
      *,	
      project_vacancies (
        id,
        role_title,
        experience,
        vacancy_skills (
          skills ( name )
        )
      )
    `,
		)
		.order('created_at', { ascending: false });
	return (
		<div className='flex justify-between items-center py-5 mx-auto px-6'>
			<div className='grid grid-cols-3 gap-x-8 gap-y-5'>
				{projects?.map(item => {
					const firstVacancy = item.project_vacancies?.[0];
					const skillsArray =
						firstVacancy?.vacancy_skills?.map(vs => vs.skills.name) || [];
					return (
						<Card
							key={item.id}
							title={item.title}
							description={item.description}
							imageUrl={item.image_url}
							status={item.status}
							isBookmarked={item.is_bookmarked}
							vacancyRole={firstVacancy?.role_title || 'Роль не указана'}
							vacancyExperience={firstVacancy?.experience || 'Опыт не указан'}
							skills={skillsArray}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Home;
