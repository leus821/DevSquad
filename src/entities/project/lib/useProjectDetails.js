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

				if (data) {
					const { data: ownerProfile } = await supabase
						.from('profiles')
						.select('id, full_name, name, role, avatar_url')
						.eq('id', data.owner_id)
						.single();

					const members = data.members || [];
					const ownerInMembers = members.some(m => m.user_id === data.owner_id);
					if (ownerProfile && !ownerInMembers) {
						members.unshift({
							user_id: ownerProfile.id,
							full_name: ownerProfile.full_name || ownerProfile.name,
							role: 'Владелец',
							avatar_url: ownerProfile.avatar_url,
						});
					}
					data.members = members;
				}

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
