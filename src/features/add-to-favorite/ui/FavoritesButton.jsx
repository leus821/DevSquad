import { Bookmark } from 'lucide-react';

const FavoritesButton = () => {
	return (
		<button className='bg-input p-3 rounded-full'>
			<Bookmark className='fill-header-icons stroke-header-icons' />
		</button>
	);
};

export default FavoritesButton;
