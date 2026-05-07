import { Image } from '@/shared/ui';
import { cn } from '@/shared/lib/utils/commonUtils';
import { User2 } from 'lucide-react';

const UserAvatar = ({ avatarUrl, className }) => {
	if (!avatarUrl)
		return (
			<div
				className={cn(
					' border-primary border-4 rounded-full w-17 aspect-square flex-all-center',
					className,
				)}
			>
				<User2 size={100} />
			</div>
		);

	return (
		<Image
			className={cn(
				'border-primary border-4 rounded-full w-17 aspect-square',
				className,
			)}
			src={avatarUrl}
		/>
	);
};

export default UserAvatar;
