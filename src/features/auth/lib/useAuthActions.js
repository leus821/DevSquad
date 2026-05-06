import { useState } from 'react';
import { supabase } from '@/shared/lib/supabase';

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
				setError(authError.message);
				return { data: null, error: authError };
			}
			return { data, error: null };
		} catch (err) {
			setError(err.message);
			return { data: null, error: err };
		} finally {
			// Это гарантирует, что лоадер выключится ВСЕГДА
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
				setError(authError.message);
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
			if (authError) setError(authError.message);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return { login, register, loading, error, exit };
};

export default useAuthActions;
