import { Logo } from '@/shared/ui';
import Navigation from './navigation';
import { Suspense } from 'react';

const Header = () => {
	return (
		<header>
			<div className='flex justify-between items-center py-5 mx-auto px-6'>
				<div className='flex'>
					<Logo />
					<span className='ml-5 block'>Помощь</span>
				</div>
				<Suspense fallback={<>Loading</>}>
					<Navigation />
				</Suspense>
			</div>
		</header>
	);
};

export default Header;
