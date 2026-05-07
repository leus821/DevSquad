'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/providers/AuthContext';
import { AuthModal, useAuthActions } from '@/features/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserAccountMenu, Button } from '@/shared/ui';
import NavIcons from './NavIcons';
import NavLinks from './NavLinks';
import Link from 'next/link';

const Navigation = () => {
	const { exit } = useAuthActions();
	const { user, loading: isLoading } = useAuth();
	const [isOpen, setIsOpenModal] = useState(false);
	const params = useSearchParams();
	const router = useRouter();
	const isGuest = params?.get('auth');

	const handleUserExit = async () => {
		await exit();
		router?.push('/');
	};

	useEffect(() => {
		if (isGuest) {
			setIsOpenModal(true);
		}
	}, [isGuest]);

	return (
		<nav className='flex gap-x-4 items-center'>
			{user && !isLoading ? (
				<>
					<NavIcons />
					<NavLinks />
					<UserAccountMenu handleUserExit={handleUserExit} />
					<Button className='px-7' asChild={true}>
						<Link href='/myprojects'>Мои проекты</Link>
					</Button>
				</>
			) : (
				!isLoading && (
					<>
						<Button onClick={() => setIsOpenModal(true)}>
							Вход или регистрация
						</Button>
						<AuthModal isOpen={isOpen} onClose={() => setIsOpenModal(false)} />
					</>
				)
			)}
		</nav>
	);
};

export default Navigation;
