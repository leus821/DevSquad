import { UserAvatar } from '@/entities/user';
import Link from 'next/link';

const TeamStack = ({ users = [], maxVisible = 4, size = 'md' }) => {
	const visibleUsers = users.slice(0, maxVisible);
	const extraCount = users.length > maxVisible ? users.length - maxVisible : 0;

	const sizeClasses = {
		sm: 'w-8 h-8',
		md: 'w-15 h-15',
		lg: 'w-14 h-15',
	};

	return (
		<div className='flex items-center p-2 -space-x-5 overflow-hidden'>
			{visibleUsers.map((user, index) => (
				<Link
					key={user.user_id || index}
					href={`/user/${user.user_id}`}
					className='relative rounded-full transition-transform hover:-translate-y-1 hover:z-50'
					style={{ zIndex: index + 1 }}
				>
					<UserAvatar
						avatarUrl={user.avatar_url || user.avatar}
						name={user.full_name || user.name}
						className={`${sizeClasses[size]} border-2 border-deep-dark hover:border-brand-purple`}
					/>
				</Link>
			))}

			{extraCount > 0 && (
				<div
					className={`flex-all-center rounded-full bg-dark border-2 border-deep-dark text-xs font-bold text-white aspect-square ${sizeClasses[size]}`}
					style={{ zIndex: 10 }}
				>
					+{extraCount}
				</div>
			)}
		</div>
	);
};

export default TeamStack;
