import { UserAvatar } from '@/entities/user';

const TeamStack = ({ users = [], maxVisible = 4, size = 'md' }) => {
	const visibleUsers = users.slice(0, maxVisible);
	const extraCount = users.length > maxVisible ? users.length - maxVisible : 0;

	const sizeClasses = {
		sm: 'w-8 h-8',
		md: 'w-15 h-15',
		lg: 'w-14 h-15',
	};

	return (
		<div className='flex items-center -space-x-5 overflow-hidden'>
			{visibleUsers.map((user, index) => (
				<div
					key={user.id || index}
					className={`
            relative rounded-full 
            transition-transform hover:translate-y-0.5 hover:z-10
          `}
					style={{ zIndex: index + 1 }}
				>
					<UserAvatar
						avatarUrl={user.avatar}
						name={user.name}
						className={sizeClasses[size]}
					/>
				</div>
			))}

			{extraCount > 0 && (
				<div
					className={`
            flex-all-center rounded-full bg-dark border-2 border-deep-dark text-xs font-bold text-white aspect-square
            ${sizeClasses[size - 4]}
          `}
					style={{ zIndex: 10 }}
				>
					+{extraCount}
				</div>
			)}
		</div>
	);
};

export default TeamStack;
