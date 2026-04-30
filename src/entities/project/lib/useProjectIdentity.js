'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/shared/lib/supabase';

const useProjectIdentity = projectId => {
	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!projectId) return;

		const fetchIdentity = async () => {
			try {
				const { data, error } = await supabase
					.from('projects')
					.select('name, status')
					.eq('id', projectId)
					.single();

				if (!error) setProject(data);
			} catch (err) {
				console.error('Ошибка получения данных проекта:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchIdentity();
	}, [projectId]);

	return { project, loading };
};

export default useProjectIdentity;
