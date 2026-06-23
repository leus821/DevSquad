import { UserAvatar } from '@/entities/user';
import Link from 'next/link';

const TeamList = ({ teamList = [] }) => {
	return (
		<ul className='flex flex-col gap-2 mb-4'>
			{teamList.map((member, index) => (
				<li key={member.user_id || index}>
					{}
					<Link
						href={`/user/${member.user_id}`}
						className='flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors group'
					>
						<UserAvatar
							avatarUrl={member.avatar_url || member.avatarUrl}
							className='w-10 h-10 border-2 group-hover:border-brand-purple transition-colors'
						/>
						<div className='min-w-0'>
							<span className='block font-bold text-white truncate group-hover:text-brand-purple transition-colors'>
								{member.full_name || member.name}
							</span>
							<span className='block text-xs text-header-icons truncate'>
								{member.role}
							</span>
						</div>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default TeamList;
