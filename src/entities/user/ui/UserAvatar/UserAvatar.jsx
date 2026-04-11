import { Image } from '@/shared/ui';
import { cn } from '@/shared/lib/utils/commonUtils';

const UserAvatar = ({ avatarUrl, className }) => {
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
