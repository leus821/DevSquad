import Image from '@/components/ui/Image';

const UserAvatar = ({ avatarUrl, className }) => {
	return (
		<Image
			className='border-primary border-4 rounded-full w-17 aspect-square'
			src={avatarUrl}
		/>
	);
};

export default UserAvatar;
