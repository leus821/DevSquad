import { useState } from 'react';
import { supabase } from '@/shared/lib/supabase';

const useAuthActions = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const login = async (email, password) => {
		setLoading(true);
		setError(null);
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		setLoading(false);
		if (error) setError(error.message);
		return { data, error };
	};

	const register = async (email, password, name, surname) => {
		setLoading(true);
		setError(null);
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					name: name,
					surname: surname,
				},
			},
		});
		setLoading(false);
		if (error) setError(error.message);
		return { data, error };
	};

	const exit = async () => {
		setLoading(true);
		setError(null);
		const { error } = await supabase.auth.signOut();
		setLoading(false);
		if (error) setError(error.message);
	};

	return { login, register, loading, error, exit };
};

export default useAuthActions;
