'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/shared/lib/supabase';

const useProjectDetails = projectId => {
	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!projectId) return;

		const fetchProjectData = async () => {
			try {
				setLoading(true);

				const { data, error: dbError } = await supabase
					.from('projects')
					.select(
						`
						*,
						vacancies (*)
					`,
					)
					.eq('id', projectId)
					.single();

				if (dbError) throw dbError;
				setProject(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProjectData();
	}, [projectId]);

	return { project, loading, error };
};

export default useProjectDetails;
