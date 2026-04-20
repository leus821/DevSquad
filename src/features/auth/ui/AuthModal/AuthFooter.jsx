const AuthFooter = ({ isLogin, onSwitch }) => (
	<p className='mt-8 text-center text-sm text-header-icons'>
		{isLogin ? 'Впервые у нас?' : 'Уже есть аккаунт?'}{' '}
		<button
			onClick={onSwitch}
			className='text-brand-purple font-bold hover:text-white transition-colors underline-offset-4 hover:underline'
		>
			{isLogin ? 'Создать профиль' : 'Войти в аккаунт'}
		</button>
	</p>
);

export default AuthFooter;
