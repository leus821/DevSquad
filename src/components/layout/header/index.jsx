import Logo from '@/components/ui/Logo';
import Navigation from './navigation';
import Container from '@/components/ui/Container';

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
