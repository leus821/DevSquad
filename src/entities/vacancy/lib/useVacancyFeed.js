'use client';
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/shared/lib/supabase';
import { useAuth } from '@/app/providers/AuthContext';
import { calculateVacancyScore } from '@/shared/lib/utils/recommendationLogic';

const defaultFilters = {
	query: '',
	role: '',
	experience: '',
	stack: [],
};

const useVacancyFeed = () => {
	const { user, loading: authLoading } = useAuth();
	const [rawVacancies, setRawVacancies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [filters, setFilters] = useState(defaultFilters);

	useEffect(() => {
		const fetchVacancies = async () => {
			try {
				setIsLoading(true);
				const { data, error } = await supabase
					.from('vacancies')
					.select(`*, projects (*)`)
					.eq('is_closed', false);
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

	const filteredVacancies = useMemo(() => {
		let result = [...rawVacancies];

		if (filters.query) {
			const q = filters.query.toLowerCase();
			result = result.filter(v =>
				v.projects?.name?.toLowerCase().includes(q),
			);
		}

		if (filters.role) {
			const r = filters.role.toLowerCase();
			result = result.filter(v =>
				v.role?.toLowerCase().includes(r),
			);
		}

		if (filters.experience) {
			result = result.filter(v => v.experience === filters.experience);
		}

		if (filters.stack && filters.stack.length > 0) {
			result = result.filter(v =>
				filters.stack.every(skill =>
					v.stack?.some(s => s.toLowerCase() === skill.toLowerCase()),
				),
			);
		}

		return result;
	}, [rawVacancies, filters]);

	const sortedVacancies = useMemo(() => {
		if (authLoading || filteredVacancies.length === 0) return filteredVacancies;
		return [...filteredVacancies].sort((a, b) => {
			const scoreA = calculateVacancyScore(a, user);
			const scoreB = calculateVacancyScore(b, user);
			if (scoreB !== scoreA) return scoreB - scoreA;
			return new Date(b.created_at) - new Date(a.created_at);
		});
	}, [filteredVacancies, user, authLoading]);

	const resetFilters = () => setFilters(defaultFilters);

	return { vacancies: sortedVacancies, isLoading: isLoading || authLoading, filters, setFilters, resetFilters };
};

export default useVacancyFeed;
