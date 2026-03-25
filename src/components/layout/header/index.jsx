import Logo from '@/components/ui/Logo';
import Navigation from './navigation';
import Container from '@/components/ui/Container';

const Header = () => {
	return (
		<Container>
			<header className='flex justify-between items-center py-5'>
				<div className='flex'>
					<Logo />
					<span className='ml-5 block'>Помощь</span>
				</div>
				<Navigation />
			</header>
		</Container>
	);
};

export default Header;
