import { UserAccountMenu } from '@/components/features/user/UserAccountMenu';
import { NavIcons } from './NavIcons';
import NavLinks from './NavLinks';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const Navigation = () => {
	return (
		<nav className='flex gap-x-4 items-center'>
			<NavIcons />
			<NavLinks />
			<UserAccountMenu />
			<Button className='px-7' asChild={true}>
				<Link href='/projects'>Мои проекты</Link>
			</Button>
		</nav>
	);
};

export default Navigation;
