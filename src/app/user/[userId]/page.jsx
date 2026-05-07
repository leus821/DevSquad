'use client';
import { Container, Skill, StatItem, UserStatus } from '@/shared/ui';
import { MapPin, Languages, GraduationCap, Briefcase, Zap } from 'lucide-react';
import { UserProfileHero, useProfile } from '@/entities/user';
import { useParams } from 'next/navigation';
import { ProjectCard } from '@/entities/project';

const ProfilePage = () => {
	const params = useParams();
	const { userId } = params;

	const { data: user, loading } = useProfile(userId);

	if (loading) return <div>loading..</div>;
	if (!user)
		return (
			<div className='text-white text-center py-20 font-bold'>
				Пользователь не найден
			</div>
		);

	return (
		<section className='py-12 bg-[#0B0E14] min-h-screen'>
			<Container className='flex flex-col gap-8'>
				<UserProfileHero user={user} isOwner={false} />

				<div className='grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-10 items-start'>
					<aside className='flex flex-col gap-8'>
						<div className='card p-6 space-y-5 bg-linear-to-br from-card to-card/50'>
							<h3 className='font-semibold mb-2'>Статус</h3>
							<div className=''>
								<UserStatus status={'considering'} />
							</div>
							{user.hours_available && (
								<div className='pt-4 border-t border-card-border/50'>
									<p className='text-header-icons text-sm'>Готов уделять:</p>
									<p className='text-white font-bold text-2xl mt-1'>
										{user.hours_available}
										<span className='text-sm font-medium text-header-icons'>
											ч / неделю
										</span>
									</p>
								</div>
							)}
						</div>

						{/* Блок Инфо */}
						<div className='card p-6 space-y-6'>
							<h3 className='font-semibold mb-4'>Информация</h3>
							<div className='space-y-4'>
								<StatItem
									icon={MapPin}
									value={user.location || 'Не указано'}
									label='Локация'
								/>
								<StatItem
									icon={Languages}
									value={user.languages || 'Не указано'}
									label='Языки'
								/>
								<StatItem
									icon={GraduationCap}
									value={user.education || 'Не указано'}
									label='Образование'
								/>
							</div>
						</div>

						{/* Достижения (Можно захардкодить пока) */}
						<div className='card p-6 space-y-6'>
							<h3 className='font-semibold mb-2'>Статистика</h3>
							<div className='grid grid-cols-2 gap-4'>
								<div className='text-center p-4 bg-white/5 rounded-2xl'>
									<p className='text-2xl font-black text-white'>2</p>
									<p className='text-[10px] text-header-icons uppercase font-bold mt-1'>
										Проекта
									</p>
								</div>
								<div className='text-center p-4 bg-white/5 rounded-2xl'>
									<p className='text-2xl font-black text-brand-purple'>14</p>
									<p className='text-[10px] text-header-icons uppercase font-bold mt-1'>
										Откликов
									</p>
								</div>
							</div>
						</div>
					</aside>

					<main className='flex flex-col gap-10'>
						<div className='card p-10 space-y-6 relative overflow-hidden'>
							<div className='absolute top-0 right-0 p-4 opacity-5'>
								<Briefcase size={120} />
							</div>
							<h3 className='text-white text-2xl font-black tracking-tight'>
								О себе
							</h3>
							<div className='prose prose-invert max-w-none text-header-icons text-lg leading-relaxed'>
								{user.bio || 'Пользователь еще не заполнил информацию о себе.'}
							</div>
						</div>

						{user.skills && (
							<div className='card p-10 space-y-8'>
								<div className='flex items-center gap-3'>
									<Zap className='text-brand-purple' size={24} />
									<h3 className='text-white text-2xl font-black tracking-tight'>
										Навыки
									</h3>
								</div>
								<div className='flex flex-wrap gap-3'>
									{user.skills?.map(skill => (
										<Skill
											key={skill}
											skillName={skill}
											className='px-5 py-2 text-base'
										/>
									)) || (
										<p className='text-header-icons italic text-sm'>
											Стек не указан
										</p>
									)}
								</div>
							</div>
						)}

						{user.founded_projects?.length > 0 && (
							<div className='space-y-8'>
								<div className='flex items-center justify-between px-2'>
									<h3 className='text-white text-2xl font-black tracking-tight'>
										Активные проекты
									</h3>
									<span className='text-xs font-bold text-header-icons uppercase tracking-widest'>
										Всего: {user.founded_projects.length}
									</span>
								</div>
								<div className='grid grid-cols-1 gap-8'>
									{user.founded_projects.map(project => (
										<ProjectCard key={project.id} project={project} />
									))}
								</div>
							</div>
						)}
					</main>
				</div>
			</Container>
		</section>
	);
};

export default ProfilePage;
