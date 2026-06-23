'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/shared/lib/supabase';
import { uploadFile } from '@/shared/lib/utils/fileUpload';
import { vacancySchema } from '../model/vacancySchema';
import { useRouter } from 'next/navigation';

const useVacancyForm = (projectId, vacancyId = null) => {
	const isEditing = vacancyId && vacancyId !== 'create';
	const [isFetching, setIsFetching] = useState(isEditing);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState(null);

	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(vacancySchema),
		mode: 'onChange',
		defaultValues: {
			role: '',
			experience: 'none',
			stack: [],
			thumbnail_url: '',
			hook: '',
			description: '',
		},
	});

	useEffect(() => {
		if (!isEditing) return;

		const fetchVacancy = async () => {
			setIsFetching(true);
			const { data } = await supabase
				.from('vacancies')
				.select('*')
				.eq('id', vacancyId)
				.single();

			if (data) {
				form.reset({
                    role: data.role || '',
                    experience: data.experience || 'none',
                    stack: data.stack || [],
                    thumbnail_url: data.thumbnail_url || '',
                    hook: data.hook || '',
                    description: data.description || '',
				});
			}
			setIsFetching(false);
		};

		fetchVacancy();
	}, [vacancyId, isEditing]);

	const submitForm = async data => {
		setIsSubmitting(true);
		setError(null);

		try {
			const finalCoverUrl = await uploadFile(
				data.thumbnail_url,
				'project-assets',
				'vacancy-thumbnails',
			);

			const payload = {
				project_id: projectId,
                role: data.role,
                experience: data.experience,
                stack: data.stack,
                hook: data.hook,
                description: data.description,
                thumbnail_url: finalCoverUrl,
			};

			let result;

			if (isEditing) {
				
				result = await supabase
					.from('vacancies')
					.update(payload)
					.eq('id', vacancyId);
			} else {
				
				result = await supabase.from('vacancies').insert([payload]);
			}

			if (result.error) throw result.error;

			router.push(`/project/${projectId}/vacancies`);

		} catch (err) {
			console.error('Ошибка при сохранении вакансии:', err);
			setError(err.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return { form, submitForm, isFetching, isSubmitting, error };
};

export default useVacancyForm;
