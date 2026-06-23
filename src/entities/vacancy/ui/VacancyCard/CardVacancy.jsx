import { EXPERIENCE_VALUES } from '@/shared/static/vacancy';

import { ApplyButton } from '@/features/apply-project'; 

const CardVacancy = ({ role, experience, vacancyId, projectId }) => {
	return (
		<div className='ml-3 flex wrap-break-word min-w-0 basis-[44%] shrink flex-col'>
			<div>
				<h2 className='font-medium wrap-break-word pointer-events-auto leading-5.5 line-clamp-3 mb-2'>
					{role}
				</h2>
				<span className='block text-sm text-front'>
					{EXPERIENCE_VALUES[experience] || experience}
				</span>
			</div>

			<div className="mt-auto w-full pointer-events-auto">
				<ApplyButton vacancyId={vacancyId} projectId={projectId} />
			</div>
		</div>
	);
};

export default CardVacancy;