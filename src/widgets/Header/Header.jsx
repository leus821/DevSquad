import { Logo } from '@/shared/ui';
import Navigation from './navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const Header = () => {
	return (
		<header>
			<div className='flex justify-between items-center py-5 mx-auto px-6'>
				<div className='flex'>
					<Logo />
					<Link
						target='_blank'
						href={'/docs/documentation.pdf'}
						className='ml-5 flex items-center'
					>
						Документация
						<ExternalLink className='ml-2' size={16} />
					</Link>
				</div>
				<Suspense fallback={<>Loading</>}>
					<Navigation />
				</Suspense>
			</div>
		</header>
	);
};

export default Header;
