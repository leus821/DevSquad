import { Input } from '@/shared/ui';

const AuthFields = ({
	isLogin,
	email,
	setEmail,
	password,
	setPassword,
	name,
	setName,
}) => (
	<>
		{!isLogin && (
			<Input
				value={name}
				onChange={e => setName(e.target.value)}
				label='Имя'
				placeholder='Иван'
			/>
		)}
		<Input
			value={email}
			onChange={e => setEmail(e.target.value)}
			label='Почта'
			type='email'
		/>
		<Input
			value={password}
			onChange={e => setPassword(e.target.value)}
			label='Пароль'
			type='password'
		/>
	</>
);

export default AuthFields;
