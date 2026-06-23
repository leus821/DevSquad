

'use client';
import { supabase } from '@/shared/lib/supabase';
import { useEffect, useState } from 'react';

const useProfile = userId => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!userId) return;

		const fetchFullProfile = async () => {
			try {
				setLoading(true);
				
				

				const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();

				if (profile) {
					

					const { data: founded } = await supabase.from('projects').select('*').eq('owner_id', userId);

					

					

					const { data: joined, error: joinError } = await supabase
						.from('projects')
						.select('*')
						.filter('members', 'cs', JSON.stringify([{ user_id: userId }]));

					if (joinError) console.error("Ошибка поиска участников:", joinError);

					

					console.log("Мой ID:", userId);
					console.log("Найденные командные проекты:", joined);

					

					const allActive = [...(founded || [])];
					joined?.forEach(proj => {
						if (!allActive.find(p => p.id === proj.id)) {
							allActive.push(proj);
						}
					});

					setData({ ...profile, active_projects: allActive });
				}
			} finally {
				setLoading(false);
			}
		};
		fetchFullProfile();
	}, [userId]);

	return { data, loading };
};

export default useProfile;