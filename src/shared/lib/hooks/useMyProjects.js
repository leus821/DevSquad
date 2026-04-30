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
				.select('*')
				.eq('owner_id', user.id)
				.order('created_at', { ascending: false });

			if (dbError) throw dbError;
			setProjects(data || []);
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
