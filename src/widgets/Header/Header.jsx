import { Logo } from '@/shared/ui';
import Navigation from './navigation';

const Header = () => {
	return (
		<header>
			<div className='flex justify-between items-center py-5 mx-auto px-6'>
				<div className='flex'>
					<Logo />
					<span className='ml-5 block'>Помощь</span>
				</div>
				<Navigation />
			</div>
		</header>
	);
};

export default Header;
