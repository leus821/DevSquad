'use client';

import { useState } from 'react';
import { NavIcons } from './NavIcons';
import NavLinks from './NavLinks';
import { Button } from '@/shared/ui';
import Link from 'next/link';
import { UserAccountMenu } from '@/shared/ui';
import { AuthModal } from '@/features/auth';

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<nav className='flex gap-x-4 items-center'>
			<NavIcons />
			<NavLinks />
			<UserAccountMenu />
			<Button className='px-7' asChild={true}>
				<Link href='/myprojects'>Мои проекты</Link>
			</Button>
			<AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</nav>
	);
};

export default Navigation;
