'use client';

import { useInView } from 'react-intersection-observer';
import { useVacancyFeed, VacancyCard } from '@/entities/vacancy';
import { useAuth } from '@/app/providers/AuthContext';
import { useVacancyFilters } from '@/features/filter-vacancies';
import { Loader2 } from 'lucide-react';
import VacancyFiltersDrawer from '@/widgets/VacancyFilters/VacancyFiltersDrawer';

const VacancyFeed = () => {
	const { user, loading: authLoading } = useAuth();
	const { filters, onChange, onReset } = useVacancyFilters();
	const { vacancies, totalCount, isLoading, isLoadingMore, hasMore, loadMore } =
		useVacancyFeed(filters, user, authLoading);

	const { ref: scrollTriggerRef } = useInView({
		threshold: 0.1,
		onChange: inView => {
			if (inView && hasMore && !isLoadingMore) {
				loadMore();
			}
		},
	});

	const showLoading = isLoading || authLoading;

	if (showLoading) {
		return (
			<div className='min-h-[60vh] flex-all-center'>
				<Loader2 className='animate-spin text-brand-purple' size={40} />
			</div>
		);
	}

	return (
		<div className='mx-auto px-6 pt-6'>
			<div>
				<div className='flex items-center gap-4 mb-6'>
					<h1 className='text-2xl font-bold text-white tracking-tight'>
						Вакансии
					</h1>
					<span className='text-xs font-bold text-header-icons uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg'>
						{totalCount}
					</span>

					<VacancyFiltersDrawer
						filters={filters}
						onChange={onChange}
						onReset={onReset}
						vacanciesCount={totalCount}
						filteredCount={vacancies.length}
					/>
				</div>

				<div className='grid grid-cols-3 gap-x-8 gap-y-5'>
					{vacancies.map((item, i) => (
						<VacancyCard
							key={item.id}
							projectTitle={item.projects?.name}
							description={item.hook}
							imageUrl={item.thumbnail_url}
							status={item.projects?.status}
							vacancyRole={item.role || 'Роль не указана'}
							vacancyExperience={item.experience || 'none'}
							skills={item.stack}
							vacancyId={item.id}
							projectId={item.project_id}
						/>
					))}
				</div>

				{isLoadingMore && (
					<div className='flex justify-center py-8'>
						<Loader2 className='animate-spin text-brand-purple' size={32} />
					</div>
				)}

				{hasMore && !isLoadingMore && (
					<div ref={scrollTriggerRef} className='h-10' />
				)}
			</div>
		</div>
	);
};

export default VacancyFeed;
