import { UserAccountMenu } from '@/features/user/UserAccountMenu';
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
			<Button asChild={true}>
				<Link href='/publish'>Разместить объявление</Link>
			</Button>
		</nav>
	);
};

export default Navigation;
