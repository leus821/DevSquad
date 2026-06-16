'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/shared/lib/supabase';
import { useAuth } from '@/app/providers/AuthContext';
import { Container, Button } from '@/shared/ui';
import { VacancyCard } from '@/entities/vacancy';
import { Clock, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

const MyApplicationsPage = () => {
	const { user, loading: authLoading } = useAuth();
	const [applications, setApplications] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (authLoading || !user) return;

		const fetchMyApplications = async () => {
			setIsLoading(true);
			try {
				// Ищем вакансии, где в массиве applicants есть ID текущего юзера
				// и которые еще не закрыты
				const { data, error } = await supabase
					.from('vacancies')
					.select('*, projects(*)')
					.contains('applicants', [user.id])
					.eq('is_closed', false);

				if (error) throw error;
				setApplications(data || []);
			} catch (err) {
				console.error('Ошибка загрузки откликов:', err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchMyApplications();
	}, [user, authLoading]);

	if (authLoading || isLoading) {
		return (
			<div className='min-h-[60vh] flex-all-center'>
				<Loader2 className='animate-spin text-brand-purple' size={40} />
			</div>
		);
	}

	return (
		<main className='py-12 bg-dark min-h-screen'>
			<Container>
				<div className='mb-10'>
					<h1 className='text-4xl font-black text-white uppercase tracking-tighter'>
						Мои отклики
					</h1>
					<p className='text-header-icons mt-2'>
						Здесь собраны вакансии, на которые вы подали заявку и ждете ответа от владельца.
					</p>
				</div>

				{applications.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{applications.map(item => (
							<div key={item.id} className='relative group'>
								{/* Индикатор статуса поверх карточки */}
								<div className='absolute -top-3 left-4 z-20 bg-brand-purple text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-2 shadow-lg'>
									<Clock size={12} /> На рассмотрении
								</div>
								
								<VacancyCard
									projectTitle={item.projects.name}
									description={item.hook}
									imageUrl={item.thumbnail_url}
									status={item.projects.status}
									vacancyRole={item.role}
									vacancyExperience={item.experience}
									skills={item.stack}
									vacancyId={item.id}
									projectId={item.project_id}
								/>
							</div>
						))}
					</div>
				) : (
					<div className='card p-20 flex flex-col items-center text-center gap-6 border-dashed opacity-60'>
						<div className='p-6 bg-white/5 rounded-full'>
							<Clock size={48} className='text-header-icons' />
						</div>
						<div>
							<h3 className='text-xl font-bold text-white'>У вас пока нет активных откликов</h3>
							<p className='text-header-icons mt-2'>Самое время найти крутой проект в ленте!</p>
						</div>
						<Button asChild className='gap-2 px-10'>
							<Link href='/'>
								В ленту вакансий <ArrowRight size={18} />
							</Link>
						</Button>
					</div>
				)}
			</Container>
		</main>
	);
};

export default MyApplicationsPage;