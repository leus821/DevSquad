'use client';
import { useState } from 'react';
import { supabase } from '@/shared/lib/supabase';
import AuthFields from './AuthFields';
import AuthFooter from './AuthFooter';
import { Modal, Button } from '@/shared/ui';
import { ArrowRight } from 'lucide-react';
import { Github } from '@/shared/assets/icons';

const AuthModal = ({ isOpen, onClose }) => {
	const [mode, setMode] = useState('login');
	const [loading, setLoading] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const isLogin = mode === 'login';

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);

		try {
			if (isLogin) {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password,
				});
				if (error) throw error;
				console.log('Успешный вход!');
			} else {
				const { data, error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						data: {
							full_name: name,
							avatar_url: '',
						},
					},
				});
				if (error) throw error;
				console.log('Юзер создан, профиль появится в базе сам!');
			}

			onClose();
		} catch (error) {
			alert(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={isLogin ? 'С возвращением' : 'Создать аккаунт'}
			maxWidth='max-w-md'
		>
			<div className='p-6 md:p-8'>
				<form onSubmit={handleSubmit} className='flex flex-col gap-5'>
					<AuthFields
						isLogin={isLogin}
						email={email}
						setEmail={setEmail}
						password={password}
						setPassword={setPassword}
						name={name}
						setName={setName}
					/>

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
