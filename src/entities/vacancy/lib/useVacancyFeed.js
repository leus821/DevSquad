'use client';
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/shared/lib/supabase';
import { useAuth } from '@/app/providers/AuthContext';
import { calculateVacancyScore } from '@/shared/lib/utils/recommendationLogic';

const useVacancyFeed = () => {
	const { user, loading: authLoading } = useAuth();
	const [rawVacancies, setRawVacancies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchVacancies = async () => {
			try {
				setIsLoading(true);
				// Запрашиваем вакансии и джоиним данные проекта
				const { data, error } = await supabase.from('vacancies').select(`
						*,
						projects (*) 
					`);

				if (error) throw error;
				setRawVacancies(data || []);
			} catch (err) {
				console.error('Ошибка загрузки вакансий:', err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchVacancies();
	}, []);

	const sortedVacancies = useMemo(() => {
		if (authLoading || rawVacancies.length === 0) return rawVacancies;

		return [...rawVacancies].sort((a, b) => {
			const scoreA = calculateVacancyScore(a, user);
			const scoreB = calculateVacancyScore(b, user);

			if (scoreB !== scoreA) return scoreB - scoreA;
			return new Date(b.created_at) - new Date(a.created_at);
		});
	}, [rawVacancies, user, authLoading]);

	return {
		vacancies: sortedVacancies,
		isLoading: isLoading || authLoading,
	};
};

export default useVacancyFeed;
