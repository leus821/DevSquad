import { Input } from '@/shared/ui';

const AuthFields = ({ isLogin, register, errors }) => (
	<>
		{!isLogin && (
			<>
				<Input
					{...register('name')}
					label='Имя'
					type='text'
					placeholder='Иван'
					error={errors.name}
				/>
				<Input
					{...register('surname')}
					label='Фамилия'
					type='text'
					placeholder='Иванов'
					error={errors.surname}
				/>
			</>
		)}
		<Input
			{...register('email')}
			label='Почта'
			type='email'
			error={errors.email}
		/>
		<Input
			{...register('password')}
			label='Пароль'
			type='password'
			error={errors.password}
		/>
	</>
);

export default AuthFields;
