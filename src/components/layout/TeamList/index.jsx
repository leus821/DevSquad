import UserAvatar from '@/components/entities/user/UserAvatar';
import Button from '@/components/ui/Button';

const TeamList = ({ teamList }) => {
	return (
		<div className='px-7 py-4 card'>
			<h3 className='font-semibold text-xl mb-4'>Команда ({teamList.length})</h3>
			<ul className='flex flex-col gap-2 mb-4'>
				{teamList.map(member => (
					<li key={member.id} className='flex items-center gap-2'>
						<UserAvatar avatarUrl={member.avatarUrl} />
						<div>
							<span className='block font-medium'>{member.name}</span>
							<span className='block text-sm text-front'>
								{member.role}
							</span>
						</div>
					</li>
				))}
			</ul>
			<Button className='w-full' variant='secondary'>Смотреть всех</Button>
		</div>
	);
};

export default TeamList;
