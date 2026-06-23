'use client';

import { useState } from 'react';

const FILTER_INITIAL = {
	search: '',
	role: [],
	experience: 'all',
	status: 'all',
	stack: [],
};

const useVacancyFilters = () => {
	const [filters, setFilters] = useState(FILTER_INITIAL);

	const onChange = setFilters;

	const onReset = () => setFilters(FILTER_INITIAL);

	return {
		filters,
		onChange,
		onReset,
		FILTER_INITIAL,
	};
};

export default useVacancyFilters;
