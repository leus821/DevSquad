import { useState } from 'react';
import { supabase } from '@/shared/lib/supabase';

const ERROR_MAP = {
	'Invalid login credentials': 'Неверный email или пароль',
	'Email not confirmed': 'Email не подтверждён',
	'User already registered': 'Пользователь с таким email уже зарегистрирован',
	'Password should be at least 6 characters': 'Пароль должен содержать минимум 6 символов',
	'rate limit exceeded': 'Слишком много попыток. Попробуйте позже',
	'Email link is invalid or has expired': 'Ссылка недействительна или истекла',
};

const localizeError = (message) => {
	return ERROR_MAP[message] || message;
};

const useAuthActions = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const login = async (email, password) => {
		setLoading(true);
		setError(null);
		try {
			const { data, error: authError } = await supabase.auth.signInWithPassword(
				{
					email,
					password,
				},
			);
			if (authError) {
				const localized = localizeError(authError.message);
				setError(localized);
				return { data: null, error: authError };
			}
			return { data, error: null };
		} catch (err) {
			setError(err.message);
			return { data: null, error: err };
		} finally {
			
			setLoading(false);
		}
	};

	const register = async (email, password, name, surname) => {
		setLoading(true);
		setError(null);
		try {
			const { data, error: authError } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: { name, surname },
				},
			});
			if (authError) {
				const localized = localizeError(authError.message);
				setError(localized);
				return { data: null, error: authError };
			}
			return { data, error: null };
		} catch (err) {
			setError(err.message);
			return { data: null, error: err };
		} finally {
			setLoading(false);
		}
	};

	const exit = async () => {
		setLoading(true);
		try {
			const { error: authError } = await supabase.auth.signOut();
			if (authError) setError(localizeError(authError.message));
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return { login, register, loading, error, exit };
};

export default useAuthActions;
