import { Input } from '@/shared/ui';

const AuthFields = ({ isLogin, register, errors }) => (
	<>
		{!isLogin && (
			<>
				<Input
					label='Имя'
					type='text'
					placeholder='Иван'
					registration={register('name')}
					error={errors.name}
				/>
				<Input
					label='Фамилия'
					type='text'
					placeholder='Иванов'
					registration={register('surname')}
					error={errors.surname}
				/>
			</>
		)}
		<Input
			label='Почта'
			type='email'
			registration={register('email')}
			error={errors.email}
		/>
		<Input
			label='Пароль'
			type='password'
			registration={register('password')}
			error={errors.password}
		/>
	</>
);

export default AuthFields;
