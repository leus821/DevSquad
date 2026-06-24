'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/providers/AuthContext';
import { AuthModal, useAuthActions } from '@/features/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserAccountMenu, Button } from '@/shared/ui';
import NavIcons from './NavIcons';
import NavLinks from './NavLinks';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

const Navigation = () => {
	const { exit, loading: authLoading } = useAuthActions();
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
		<>
			{authLoading && (
				<div className='fixed inset-0 z-200 bg-black/60 flex items-center justify-center'>
					<Loader2 className='animate-spin text-brand-purple' size={40} />
				</div>
			)}
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
		</>
	);
};

export default Navigation;
