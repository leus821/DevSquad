import { StatItem, UserStatus } from '@/shared/ui';
import { GraduationCap, Languages, MapPin } from 'lucide-react';

const UserProfileLeft = ({
	status,
	hours_available,
	location,
	languages,
	education,
}) => {
	return (
		<aside className='flex flex-col gap-8'>
			<div className='card p-6 space-y-5 bg-linear-to-br from-card to-card/50'>
				<h3 className='font-semibold mb-2'>Статус</h3>
				<div className=''>
					<UserStatus status={status} />
				</div>
				{hours_available && (
					<div className='pt-4 border-t border-card-border/50'>
						<p className='text-header-icons text-sm'>Готов уделять:</p>
						<p className='text-white font-bold text-2xl mt-1'>
							{hours_available}
							<span className='text-sm font-medium text-header-icons'>
								ч / неделю
							</span>
						</p>
					</div>
				)}
			</div>

			<div className='card p-6 space-y-6'>
				<h3 className='font-semibold mb-4'>Информация</h3>
				<div className='space-y-4'>
					<StatItem
						icon={MapPin}
						value={location || 'Не указано'}
						label='Локация'
					/>
					<StatItem
						icon={Languages}
						value={languages || 'Не указано'}
						label='Языки'
					/>
					<StatItem
						icon={GraduationCap}
						value={education || 'Не указано'}
						label='Образование'
					/>
				</div>
			</div>

			<div className='card p-6 space-y-6'>
				<h3 className='font-semibold mb-2'>Статистика</h3>
				<div className='grid grid-cols-2 gap-4'>
					<div className='text-center p-4 bg-white/5 rounded-2xl'>
						<p className='text-2xl font-black text-white'>2</p>
						<p className='text-[10px] text-header-icons uppercase font-bold mt-1'>
							Проекта
						</p>
					</div>
					<div className='text-center p-4 bg-white/5 rounded-2xl'>
						<p className='text-2xl font-black text-brand-purple'>14</p>
						<p className='text-[10px] text-header-icons uppercase font-bold mt-1'>
							Откликов
						</p>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default UserProfileLeft;
