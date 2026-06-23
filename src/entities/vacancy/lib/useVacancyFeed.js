'use client';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { supabase } from '@/shared/lib/supabase';
import { calculateVacancyScore } from '@/shared/lib/utils/recommendationLogic';

const PAGE_SIZE = 12;

const buildQuery = (filters, from, to) => {
  let query = supabase
    .from('vacancies')
    .select(`
      *,
      projects (*)
    `, { count: 'exact' })
    .eq('is_closed', false)
    .range(from, to);

  if (filters.experience && filters.experience !== 'all') {
    query = query.eq('experience', filters.experience);
  }

  if (filters.status && filters.status !== 'all') {
    query = query.eq('projects.status', filters.status);
  }

  if (filters.role.length > 0) {
    const roleFilters = filters.role.map(r => `role.ilike.%${r}%`).join(',');
    query = query.or(roleFilters);
  }

  if (filters.stack.length > 0) {
    query = query.contains('stack', filters.stack);
  }

  if (filters.search) {
    const q = `%${filters.search}%`;
    query = query.or(
      `role.ilike.${q},hook.ilike.${q},projects.name.ilike.${q}`,
    );
  }

  return query;
};

const useVacancyFeed = (filters = {}, user = null, authLoading = false) => {
  const [vacancies, setVacancies] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(0);

  const filtersKey = JSON.stringify(filters);

  const fetchFirstPage = useCallback(async () => {
    setIsLoading(true);
    setVacancies([]);
    setHasMore(true);
    pageRef.current = 0;

    try {
      const { data, error, count } = await buildQuery(filters, 0, PAGE_SIZE - 1);

      if (error) throw error;

      setVacancies(data || []);
      setTotalCount(count || 0);
      setHasMore((data?.length || 0) >= PAGE_SIZE);
    } catch (err) {
      console.error('Ошибка загрузки вакансий:', err.message);
    } finally {
      setIsLoading(false);
    }
  }, [filtersKey]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const nextPage = pageRef.current + 1;
    const from = nextPage * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    try {
      const { data, error, count } = await buildQuery(filters, from, to);

      if (error) throw error;

      setVacancies(prev => [...prev, ...(data || [])]);
      setTotalCount(count || 0);
      setHasMore((data?.length || 0) >= PAGE_SIZE);
      pageRef.current = nextPage;
    } catch (err) {
      console.error('Ошибка загрузки ещё:', err.message);
    } finally {
      setIsLoadingMore(false);
    }
  }, [filtersKey, isLoadingMore, hasMore]);

  useEffect(() => {
    fetchFirstPage();
  }, [fetchFirstPage]);

  const sortedVacancies = useMemo(() => {
    if (!vacancies.length) return vacancies;

    const result = [...vacancies];

    if (!authLoading && user) {
      result.sort((a, b) => {
        const scoreA = calculateVacancyScore(a, user);
        const scoreB = calculateVacancyScore(b, user);
        if (scoreB !== scoreA) return scoreB - scoreA;
        return new Date(b.created_at) - new Date(a.created_at);
      });
    }

    return result;
  }, [vacancies, user, authLoading]);

  return {
    vacancies: sortedVacancies,
    totalCount,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
  };
};

export default useVacancyFeed;
