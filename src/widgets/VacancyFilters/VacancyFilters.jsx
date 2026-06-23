'use client';

import { SUGGESTED_SKILLS } from '@/shared/static/skills';
import { EXPERIENCE_OPTIONS } from '@/shared/static/vacancy';
import { PROJECT_STATUSES } from '@/shared/static/project';
import { MultiCreatableSelect, SelectCustom } from '@/shared/ui';

const FILTER_STATUSES = [
	{ value: 'all', label: 'Все', id: 'all' },
	...Object.entries(PROJECT_STATUSES).map(([key, val]) => ({
		value: key,
		label: val.label,
		id: key,
	})),
];

const ALL_EXPERIENCE = [
	{ value: 'all', label: 'Любой опыт', id: 'all' },
	...EXPERIENCE_OPTIONS,
];

const VacancyFilters = ({ filters, onChange, onReset, className }) => {
	const { search, experience, status, stack, role } = filters;

	const updateFilter = (key, value) => {
		onChange({ ...filters, [key]: value });
	};

	const hasActiveFilters =
		search ||
		role.length > 0 ||
		(experience && experience !== 'all') ||
		(status && status !== 'all') ||
		stack.length > 0;

	return (
		<div className={className}>
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-white text-lg font-bold tracking-tight'>Фильтры</h2>
				{hasActiveFilters && (
					<button
						onClick={onReset}
						className='text-xs text-brand-purple hover:text-white font-bold uppercase tracking-widest transition-colors'
					>
						Сбросить всё
					</button>
				)}
			</div>

			<div className='space-y-5'>
				<MultiCreatableSelect
					label='Поиск по проекту'
					placeholder='StudHome...'
					value={search ? [search] : []}
					onChange={v => updateFilter('search', v.join(' '))}
					suggestions={[]}
					name='filter-search'
				/>

				<MultiCreatableSelect
					label='Поиск по роли'
					placeholder='Frontend, Backend...'
					value={role}
					onChange={v => updateFilter('role', v)}
					suggestions={SUGGESTED_SKILLS}
					name='filter-role'
				/>

				<MultiCreatableSelect
					label='Стек технологий'
					placeholder='React, TypeScript...'
					value={stack}
					onChange={v => updateFilter('stack', v)}
					suggestions={SUGGESTED_SKILLS}
					name='filter-stack'
				/>

				<div className='grid grid-cols-2 gap-3'>
					<SelectCustom
						label='Опыт работы'
						value={experience || 'all'}
						onChange={v => updateFilter('experience', v)}
						options={ALL_EXPERIENCE}
					/>
					<SelectCustom
						label='Статус проекта'
						value={status || 'all'}
						onChange={v => updateFilter('status', v)}
						options={FILTER_STATUSES}
					/>
				</div>
			</div>
		</div>
	);
};

export default VacancyFilters;
