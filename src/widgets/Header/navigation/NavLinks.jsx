import { NAV_LINKS } from '@/shared/static/navigations';
import Link from 'next/link';

const NavLinks = () => {
	return (
		<ul className='flex gap-x-4'>
			{NAV_LINKS.map(item => (
				<li key={item.id}>
					<Link href={item.href}>{item.label}</Link>
				</li>
			))}
		</ul>
	);
};

export default NavLinks;
