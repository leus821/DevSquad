import { Bookmark } from 'lucide-react';

const FavoritesButton = () => {
	return (
		<button className='bg-[#1F2430] p-3 rounded-full'>
			<Bookmark className='fill-header-icons stroke-header-icons' />
		</button>
	);
};

export default FavoritesButton;
