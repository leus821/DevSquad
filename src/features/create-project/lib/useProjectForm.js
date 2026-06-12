'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/shared/lib/supabase';
import { useAuth } from '@/app/providers/AuthContext';
import { createProjectSchema } from '../model/createProjectSchema';
import { uploadFile } from '@/shared/lib/utils/fileUpload';

import { useRouter } from 'next/navigation'; 

const useProjectForm = (projectId = null) => {
	const { user } = useAuth();

	const router = useRouter(); 

	const [isFetching, setIsFetching] = useState(!!projectId);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState(null);

	const form = useForm({
		resolver: zodResolver(createProjectSchema),
		mode: 'all',
		defaultValues: {
			name: '',
			slogan: '',
			status: 'idea',
			description: '',
			idea: '',
			approach: '',
			links: [{ id: Date.now().toString(), label: 'Сайт', url: '' }],
			gallery: [],
		},
	});

	useEffect(() => {
		if (!projectId) return;

		const fetchProject = async () => {
			setIsFetching(true);
			const { data, error } = await supabase
				.from('projects')
				.select('*')
				.eq('id', projectId)
				.single();

			if (data) {
				form.reset({
					name: data.name,
					slogan: data.slogan,
					status: data.status,
					description: data.description,
					idea: data.idea,
					approach: data.approach,
					links: data.links || [],
					gallery: data.gallery || [],
					logo_url: data.logo_url,
				});
			}
			setIsFetching(false);
		};

		fetchProject();
	}, [projectId, form]);

	const submitForm = async data => {
		setIsSubmitting(true);
		try {
			const logoUrl = await uploadFile(
				data.logo_url,
				'project-assets',
				'logos',
			);

			const gallery = data.gallery
				? await Promise.all(
						data.gallery.map(img =>
							uploadFile(img, 'project-assets', 'screenshots'),
						),
					)
				: [];

			const payload = {
				name: data.name,
				slogan: data.slogan,
				status: data.status,
				description: data.description,
				idea: data.idea,
				approach: data.approach,
				links: data.links,
				gallery: gallery.filter(Boolean),
				logo_url: logoUrl,
				owner_id: user.id,
			};

			let result;

			if (projectId) {
				result = await supabase
					.from('projects')
					.update(payload)
					.eq('id', projectId);
				console.log(result);
			} else {
				result = await supabase.from('projects').insert([payload]);
			}

			if (result.error) throw result.error;

			router.refresh(); 
			router.push('/myprojects');

		} catch (err) {
			setError(err.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return { form, submitForm, isFetching, isSubmitting, error };
};

export default useProjectForm;
