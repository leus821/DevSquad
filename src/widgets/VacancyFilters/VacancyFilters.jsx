'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/shared/lib/utils/commonUtils';
import { MultiCreatableSelect, SelectCustom, Button } from '@/shared/ui';
import { EXPERIENCE_OPTIONS } from '@/shared/static/vacancy';
import { SUGGESTED_SKILLS } from '@/shared/static/skills';

const VacancyFilters = ({ filters, onChange, onReset }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [draft, setDraft] = useState(filters);

	const updateFilter = (key, value) => {
		setDraft(prev => ({ ...prev, [key]: value }));
	};

	const applyFilters = () => {
		onChange(draft);
		setIsOpen(false);
	};

	const resetAndApply = () => {
		const empty = { query: '', role: '', experience: '', stack: [] };
		setDraft(empty);
		onReset();
		setIsOpen(false);
	};

	const hasActiveFilters = filters.query || filters.role || filters.experience || (filters.stack && filters.stack.length > 0);

	return (
		<>
			<button
				onClick={() => {
					setDraft(filters);
					setIsOpen(true);
				}}
				className={cn(
					'flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all cursor-pointer',
					hasActiveFilters
						? 'border-brand-purple bg-brand-purple/10 text-brand-purple'
						: 'border-card-border text-header-icons hover:border-brand-purple/50 hover:text-white',
				)}
			>
				<SlidersHorizontal size={18} />
				<span className='text-sm font-medium'>Фильтры</span>
				{hasActiveFilters && (
					<span className='w-2 h-2 rounded-full bg-brand-purple' />
				)}
			</button>

			{isOpen && (
				<div
					className='fixed inset-0 z-50 bg-black/60'
					onClick={() => setIsOpen(false)}
				>
					<div
						onClick={e => e.stopPropagation()}
						className='fixed left-0 top-0 bottom-0 w-96 bg-card border-r border-card-border shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-300'
					>
						<div className='flex items-center justify-between px-6 py-5 border-b border-card-border'>
							<h2 className='text-xl font-bold'>Фильтры</h2>
							<button
								onClick={() => setIsOpen(false)}
								className='text-header-icons hover:text-white transition-colors cursor-pointer'
							>
								<X size={22} />
							</button>
						</div>

						<div className='flex-1 overflow-y-auto p-6 space-y-6'>
							<div className='space-y-1.5'>
								<label className='text-xs font-bold text-header-icons uppercase ml-1'>
									Поиск по названию
								</label>
								<input
									value={draft.query || ''}
									onChange={e => updateFilter('query', e.target.value)}
									placeholder='Название проекта...'
									className='w-full bg-input border border-card-border rounded-xl py-3 px-4 text-white outline-none transition-all placeholder:text-header-icons/50 text-sm focus:border-brand-purple'
								/>
							</div>

							<div className='space-y-1.5'>
								<label className='text-xs font-bold text-header-icons uppercase ml-1'>
									Роль
								</label>
								<input
									value={draft.role || ''}
									onChange={e => updateFilter('role', e.target.value)}
									placeholder='Frontend, Backend, Дизайнер...'
									className='w-full bg-input border border-card-border rounded-xl py-3 px-4 text-white outline-none transition-all placeholder:text-header-icons/50 text-sm focus:border-brand-purple'
								/>
							</div>

							<SelectCustom
								label='Опыт'
								value={draft.experience || ''}
								onChange={value => updateFilter('experience', value === 'all' ? '' : value)}
								options={[
									{ value: 'all', label: 'Любой', id: 0 },
									...EXPERIENCE_OPTIONS,
								]}
							/>

							<MultiCreatableSelect
								label='Стек технологий'
								value={draft.stack || []}
								onChange={value => updateFilter('stack', value)}
								suggestions={SUGGESTED_SKILLS.map(s => ({ value: s.value, label: s.label }))}
								placeholder='React, Node.js...'
							/>
						</div>

						<div className='px-6 py-4 border-t border-card-border flex gap-3'>
							<Button
								variant='secondary'
								onClick={resetAndApply}
								className='flex-1'
							>
								Сбросить все
							</Button>
							<Button
								onClick={applyFilters}
								className='flex-1'
							>
								Применить
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default VacancyFilters;
