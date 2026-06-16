'use client';
import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/shared/lib/supabase';
import { useAuth } from '@/app/providers/AuthContext';
import { editProfileSchema } from '../model/editProfileSchema';
import { uploadFile } from '@/shared/lib/utils/fileUpload';

const useProfileEdit = () => {
	const { user, refreshUser, loading: authLoading } = useAuth();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [apiError, setApiError] = useState(null);
	const hasResetRef = useRef(false);

	const form = useForm({
		resolver: zodResolver(editProfileSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			surname: '',
			avatar_url: '',
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
		if (user && !authLoading && !hasResetRef.current) {
			hasResetRef.current = true;
			form.reset({
				name: user.name || user.user_metadata?.name || '',
				surname: user.surname || user.user_metadata?.surname || '',
				role: user.role || '',
				avatar_url: user.avatar_url || '',
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, authLoading]);

	const updateProfile = async data => {
		setIsSubmitting(true);
		setApiError(null);

		try {
			let avatarUrl = data.avatarUrl;

			if (data.avatar_url && data.avatar_url.startsWith('blob:')) {
				avatarUrl = await uploadFile(
					data.avatar_url,
					'project-assets',
					'avatars',
				);
			}
			const { error } = await supabase
				.from('profiles')
				.update({
					...data,
					avatar_url: avatarUrl,
				})
				.eq('id', user.id);

			if (error) throw error;
			await refreshUser();
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
