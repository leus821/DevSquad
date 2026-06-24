'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/shared/lib/supabase';
import { useAuth } from '@/app/providers/AuthContext';

export const useMyProjects = () => {
	const { user, loading: authLoading } = useAuth();
	const [projects, setProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchProjects = async () => {
		if (!user) return;

		try {
			setIsLoading(true);
			const { data, error: dbError } = await supabase
				.from('projects')
				.select('*, owner:owner_id(id, full_name, name, role, avatar_url), vacancies(applicants)')
				.eq('owner_id', user.id)
				.order('created_at', { ascending: false });

			if (dbError) throw dbError;

			const enriched = (data || []).map(project => {
				const totalResponses = (project.vacancies || []).reduce(
					(sum, v) => sum + (v.applicants?.length || 0), 0
				);
				const ownerProfile = project.owner;
				const members = project.members || [];
				const ownerInMembers = members.some(m => String(m.user_id) === String(project.owner_id));
				if (ownerProfile && !ownerInMembers) {
					members.unshift({
						user_id: ownerProfile.id,
						full_name: ownerProfile.full_name || ownerProfile.name,
						role: 'Владелец',
						avatar_url: ownerProfile.avatar_url,
					});
				}
				return { ...project, totalResponses, members };
			});

			setProjects(enriched);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!authLoading) {
			fetchProjects();
		}
	}, [user, authLoading]);

	return {
		projects,
		isLoading: isLoading || authLoading,
		error,
		refresh: fetchProjects,
		canCreate: projects.length < 3,
		count: projects.length,
	};
};
