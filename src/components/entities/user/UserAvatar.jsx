import Image from '@/components/ui/Image';
import { cn } from '@/lib/utils';

const UserAvatar = ({ avatarUrl, className }) => {
	return (
		<Image
			className={cn('border-primary border-4 rounded-full w-17 aspect-square', className)}
			src={avatarUrl}
		/>
	);
};

export default UserAvatar;
