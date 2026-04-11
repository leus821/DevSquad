import { UserAvatar } from '@/entities/user';

const TeamList = ({ teamList = [] }) => {
	return (
		<ul className='flex flex-col gap-2 mb-4'>
			{teamList.map(member => (
				<li key={member.id} className='flex items-center gap-2'>
					<UserAvatar avatarUrl={member.avatarUrl} />
					<div>
						<span className='block font-medium'>{member.name}</span>
						<span className='block text-sm text-front'>{member.role}</span>
					</div>
				</li>
			))}
		</ul>
	);
};

export default TeamList;
