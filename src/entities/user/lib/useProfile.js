'use client';

import { supabase } from '@/shared/lib/supabase';
import { useEffect, useState } from 'react';

const useProfile = username => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchFullProfile = async () => {
			try {
				setLoading(true);
				// 1. Берем профиль
				const { data: profile } = await supabase
					.from('profiles')
					.select('*')
					.eq('id', username)
					.single();

				if (profile) {
					// 2. Берем проекты этого юзера
					const { data: projects } = await supabase
						.from('projects')
						.select('*')
						.eq('owner_id', profile.id);

					setData({ ...profile, founded_projects: projects || [] });
				}
			} finally {
				setLoading(false);
			}
		};
		fetchFullProfile();
	}, [username]);

	return { data, loading };
};

export default useProfile;
