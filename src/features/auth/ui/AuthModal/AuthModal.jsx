'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthActions } from '@/features/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthFields from './AuthFields';
import AuthFooter from './AuthFooter';
import { Modal, Button, ErrorField } from '@/shared/ui';
import { ArrowRight } from 'lucide-react';
import { Github } from '@/shared/assets/icons';
import { loginSchema, registerSchema } from '../../model/schemas';

const AuthModal = ({ isOpen, onClose }) => {
	const { login, register: signUp, error: apiError } = useAuthActions();

	const [mode, setMode] = useState('login');
	const isLogin = mode === 'login';

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(isLogin ? loginSchema : registerSchema),
		mode: 'onTouched',
	});

	const onSubmit = async data => {
		if (apiError) alert(apiError);
		console.log(data);

		if (isLogin) {
			const { error } = await login(data.email, data.password);
			if (!error) onClose();
		} else {
			const { error } = await signUp(
				data.email,
				data.password,
				data.name,
				data.surname,
			);
			if (!error) {
				onClose();
			}
		}
	};

	const toggleMode = () => {
		setMode(isLogin ? 'register' : 'login');
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={isLogin ? 'С возвращением' : 'Создать аккаунт'}
			maxWidth='max-w-md'
		>
			<div className='p-6 md:p-8'>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
					<AuthFields isLogin={isLogin} register={register} errors={errors} />
					{apiError && <ErrorField errorText={apiError} />}

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

				<Button variant='secondary' type='button' className='w-full py-3 gap-3'>
					<Github />
					Продолжить с GitHub
				</Button>

				<AuthFooter isLogin={isLogin} onSwitch={toggleMode} />
			</div>
		</Modal>
	);
};

export default AuthModal;
