'use client';

import { useVacancy } from '@/entities/vacancy';
import { VacancyProject } from '@/widgets';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

const VacancyPage = () => {
	const { vacancyId } = useParams();
	const { vacancy, isLoading } = useVacancy(vacancyId);

	if (isLoading) {
		return (
			<div className='min-h-screen flex flex-all-center'>
				<Loader2 className='animate-spin text-brand-purple' size={40} />
			</div>
		);
	}
	return <VacancyProject vacancy={vacancy} project={vacancy.project} />;
};

export default VacancyPage;
