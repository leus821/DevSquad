'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/shared/lib/supabase';

const useVacancy = vacancyId => {
	const [vacancy, setVacancy] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!vacancyId) return;

		const fetchVacancy = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const { data, error: dbError } = await supabase
					.from('vacancies')
					.select(
						`
						*,
						project:projects (*) 
					`,
					)
					.eq('id', vacancyId)
					.single();

				if (dbError) throw dbError;

				setVacancy(data);
			} catch (err) {
				console.error('Ошибка при загрузке вакансии:', err.message);
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchVacancy();
	}, [vacancyId]);

	return { vacancy, isLoading, error };
};

export default useVacancy;
