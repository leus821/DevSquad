import { StatItem, UserStatus } from '@/shared/ui';
import { FolderGit2, GraduationCap, Languages, MapPin } from 'lucide-react';

const UserProfileLeft = ({
	status,
	hours_available,
	location,
	languages,
	education,
	projectsCount = 0,
}) => {
	return (
		<aside className='flex flex-col gap-8'>
			<div>
				<h3 className='font-semibold text-xl ml-2 mb-2'>Статус</h3>
				<div className='card p-6 space-y-5 bg-linear-to-br from-card to-card/50'>
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
			</div>

			<div>
				<h3 className='font-semibold text-xl ml-2 mb-2'>Информация</h3>
				<div className='card p-6 space-y-6'>
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
			</div>
		</aside>
	);
};

export default UserProfileLeft;
