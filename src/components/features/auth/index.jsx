'use client';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import AuthFields from './AuthFields';
import { Github } from '@/assets/icons/socials';
import AuthFooter from './AuthFooter';

const AuthModal = ({ isOpen, onClose }) => {
	const [mode, setMode] = useState('login'); // 'login' | 'register'
	const isLogin = mode === 'login';

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={isLogin ? 'С возвращением' : 'Создать аккаунт'}
			maxWidth='max-w-md'
		>
			<div className='p-6 md:p-8'>
				<form className='flex flex-col gap-5'>
					<AuthFields isLogin={isLogin} />

					<Button type='submit' className='w-full py-4 mt-2 group'>
						{isLogin ? 'Войти в систему' : 'Зарегистрироваться'}
						<ArrowRight
							size={18}
							className='group-hover:translate-x-1 transition-transform'
						/>
					</Button>
				</form>

				<div className='relative my-8'>
					<div className='absolute inset-0 flex items-center'>
						<div className='w-full border-t border-card-border'></div>
					</div>
					<div className='relative flex justify-center text-xs uppercase'>
						<span className='bg-deep-dark px-2 text-header-icons'>
							Или через
						</span>
					</div>
				</div>

				<Button
					variant='secondary'
					type='button'
					className='w-full py-3 gap-3'
					onClick={() => console.log(2)}
				>
					<Github />
					Продолжить с GitHub
				</Button>

				<AuthFooter
					isLogin={isLogin}
					onSwitch={() => setMode(isLogin ? 'register' : 'login')}
				/>
			</div>
		</Modal>
	);
};

export default AuthModal;
