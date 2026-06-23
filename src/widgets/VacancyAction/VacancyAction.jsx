import { ApplyButton } from '@/features/apply-project';
import { EXPERIENCE_VALUES } from '@/shared/static/vacancy';

const VacancyAction = ({
	experience,
	role,
	vacancyId,
	projectId,
}) => {
	return (
		<div className='bg-card flex-1 border-card-border border-2 rounded-3xl p-4 self-start mb-7'>
			<div className='mb-7'>
				<h2 className='text-xl font-bold'>{role}</h2>
				<span className='text-front text-sm'>{EXPERIENCE_VALUES[experience] || experience}</span>
			</div>
			<div className='flex gap-4 mb-4'>
				<ApplyButton vacancyId={vacancyId} projectId={projectId} />
			</div>
		</div>
	);
};

export default VacancyAction;
