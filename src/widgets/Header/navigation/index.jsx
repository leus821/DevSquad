'use client';

import { useState } from 'react';
import { useAuth } from '@/app/providers/AuthContext';
import { AuthModal } from '@/features/auth';
import { UserAccountMenu, Button } from '@/shared/ui';
import NavIcons from './NavIcons';
import NavLinks from './NavLinks';
import Link from 'next/link';

const Navigation = () => {
	const { user, isLoading } = useAuth();
	const [isOpen, setIsOpen] = useState(true);

	return (
		<nav className='flex gap-x-4 items-center'>
			<AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
			{user && !isLoading ? (
				<>
					<NavIcons />
					<NavLinks />
					<UserAccountMenu />
					<Button className='px-7' asChild={true}>
						<Link href='/myprojects'>Мои проекты</Link>
					</Button>
					<AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
				</>
			) : (
				<Button>Вход или регистрация</Button>
			)}
		</nav>
	);
};

export default Navigation;
