import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/shared/lib/supabase';
import { useAuth } from '@/app/providers/AuthContext';
import { editProfileSchema } from '../model/editProfileSchema';

const useProfileEdit = () => {
	const { user, refreshUser, loading: authLoading } = useAuth();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [apiError, setApiError] = useState(null);

	const form = useForm({
		resolver: zodResolver(editProfileSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			surname: '',
			role: '',
			username: '',
			bio: '',
			status: 'search',
			hours_available: 20,
			location: '',
			languages: '',
			education: '',
			github_url: '',
			telegram: '',
			skills: [],
		},
	});

	useEffect(() => {
		if (user && !authLoading && !form.formState.isDirty) {
			form.reset({
				name: user.name || '',
				surname: user.surname || '',
				role: user.role || '',
				username: user.username || '',
				bio: user.bio || '',
				status: user.status || 'search',
				hours_available: user.hours_available || 20,
				location: user.location || '',
				languages: user.languages || '',
				education: user.education || '',
				github_url: user.github_url || '',
				telegram: user.telegram || '',
				skills: user.skills || [],
			});
		}
	}, [user, authLoading]);

	const updateProfile = async data => {
		setIsSubmitting(true);
		setApiError(null);

		try {
			const { error } = await supabase
				.from('profiles')
				.update({
					...data,
				})
				.eq('id', user.id);

			if (error) throw error;

			return { success: true };
		} catch (err) {
			setApiError(err.message);
			return { success: false, error: err.message };
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		form,
		updateProfile,
		isLoading: authLoading,
		isSubmitting: isSubmitting,
		apiError,
		isDirty: form.formState.isDirty,
	};
};

export default useProfileEdit;
