'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/shared/lib/supabase';
import { uploadFile } from '@/shared/lib/utils/fileUpload';
import { vacancySchema } from '../model/vacancySchema';

const useVacancyForm = (projectId, vacancyId = null) => {
	const [isFetching, setIsFetching] = useState(!!vacancyId);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState(null);

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
		if (!vacancyId) return;

		const fetchVacancy = async () => {
			setIsFetching(true);
			const { data } = await supabase
				.from('vacancies')
				.select('*')
				.eq('id', vacancyId)
				.single();

			if (data) {
				form.reset({
					role: data.role,
					experience: data.experience,
					stack: data.stack || [],
					thumbnail_url: data.thumbnail_url,
					hook: data.hook,
					description: data.description,
				});
			}
			setIsFetching(false);
		};

		fetchVacancy();
	}, [vacancyId, form]);

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

			if (vacancyId) {
				// Обновление
				result = await supabase
					.from('vacancies')
					.update(payload)
					.eq('id', vacancyId);
			} else {
				// Создание новой
				result = await supabase.from('vacancies').insert([payload]);
			}

			if (result.error) throw result.error;
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
