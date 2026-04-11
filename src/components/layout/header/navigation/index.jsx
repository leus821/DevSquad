'use client';

import { UserAccountMenu } from '@/components/features/user/UserAccountMenu';
import { NavIcons } from './NavIcons';
import NavLinks from './NavLinks';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import AuthModal from '@/components/features/auth';
import { useState } from 'react';

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
