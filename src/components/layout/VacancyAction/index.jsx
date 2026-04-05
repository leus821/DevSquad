import ApplyButton from '@/components/features/ApplyButton';
import FavoritesButton from '@/components/features/FavoriteButton';
import { Eye, Users } from 'lucide-react';

const VacancyAction = ({ experience, role, responses }) => {
	return (
		<div className='bg-card flex-1 border-card-border border-2 rounded-3xl p-4 self-start'>
			<div className='mb-7'>
				<h2 className='text-xl font-bold'>{role}</h2>
				<span className='text-front text-sm'>{experience}</span>
			</div>
			<div className='flex gap-4 mb-4'>
				<ApplyButton />
				<FavoritesButton />
			</div>
			<div className='flex justify-between px-3'>
				<div className='flex gap-1 items-center'>
					<Users className='fill-header-icons stroke-header-icons' />
					<span className='text-sm text-front'>{responses} 1 откликов</span>
				</div>
				<div className='flex gap-1 items-center'>
					<Eye className='stroke-header-icons' />
					<span className='text-sm text-front'>{responses} 22к просмотров</span>
				</div>
			</div>
		</div>
	);
};

export default VacancyAction;
