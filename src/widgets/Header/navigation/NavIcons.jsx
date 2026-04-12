import { NAV_ICONS } from '@/shared/static/navigations';
import Link from 'next/link';

const NavIcons = () => {
	return (
		<ul className='flex gap-x-3'>
			{NAV_ICONS.map(item => {
				const Icon = item.icon;
				return (
					<li key={item.id}>
						<Link href={item.href}>
							<Icon className='fill-header-icons stroke-header-icons' />
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default NavIcons;
