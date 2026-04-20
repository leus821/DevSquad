import { useState } from 'react';
import { supabase } from '@/shared/lib/supabase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers/AuthContext';

const useOnboarding = () => {
	const { refreshUser } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const router = useRouter();

	const submitProfile = async (userId, formData) => {
		setLoading(true);
		setError(null);

		const { error } = await supabase
			.from('profiles')
			.update({
				...formData,
				is_completed: true,
			})
			.eq('id', userId);

		setLoading(false);

		if (error) {
			setError(error.message);
			return false;
		}

		await refreshUser();

		router.back();
		return true;
	};

	return { submitProfile, loading, error };
};

export default useOnboarding;
