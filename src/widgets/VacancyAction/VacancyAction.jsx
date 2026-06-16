import { FavoritesButton } from '@/features/add-to-favorite';
import { ApplyButton } from '@/features/apply-project';
import { Eye, Users } from 'lucide-react';

// 1. Добавляем vacancyId и projectId в пропсы
const VacancyAction = ({ experience, role, responses, vacancyId, projectId }) => {
	return (
		<div className='bg-card flex-1 border-card-border border-2 rounded-3xl p-4 self-start mb-7'>
			<div className='mb-7'>
				<h2 className='text-xl font-bold'>{role}</h2>
				<span className='text-front text-sm'>{experience}</span>
			</div>
			<div className='flex gap-4 mb-4'>
				{/* 2. Передаем ID в кнопку */}
				<ApplyButton vacancyId={vacancyId} projectId={projectId} />
				<FavoritesButton />
			</div>
			<div className='flex justify-between px-3'>
				<div className='flex gap-1 items-center'>
					<Users size={16} className='fill-header-icons stroke-header-icons' />
					<span className='text-sm text-front'>
						{responses || 0} откликов
					</span>
				</div>
				<div className='flex gap-1 items-center'>
					<Eye size={16} className='stroke-header-icons' />
					<span className='text-sm text-front'>22к просмотров</span>
				</div>
			</div>
		</div>
	);
};

export default VacancyAction;