'use client';
import { Container } from '@/shared/ui';
import { UserProfileHero, useProfile } from '@/entities/user';
import { useParams } from 'next/navigation';
import { UserProfileLeft, UserProjects, UserSkillsList } from '@/widgets';
import ProjectCardMinimal from '@/entities/project/ui/ProjectCard/ProjectCardMinimal';
import { useAuth } from '@/app/providers/AuthContext';
import { Loader2 } from 'lucide-react';

const ProfilePage = () => {
	const params = useParams();
	const { userId } = params;

	const { user: currentUser } = useAuth();

	const { data: user, loading } = useProfile(userId);

	if (loading) return (
		<div className='min-h-screen flex flex-all-center'>
			<Loader2 className='animate-spin text-brand-purple' size={40} />
		</div>
	);
	if (!user)
		return (
			<div className='text-white text-center py-20 font-bold'>
				Пользователь не найден
			</div>
		);

	const isOwner = currentUser?.id === userId;

	return (
		<section className='py-12 bg-[#0B0E14] min-h-screen'>
			<Container className='flex flex-col gap-8'>
				<UserProfileHero user={user} isOwner={isOwner} />

				<div className='grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-10 items-start'>
					<UserProfileLeft
						status={user.status}
						hours_available={user.hours_available}
						location={user.location}
						languages={user.languages}
						education={user.education}
					/>

					<main className='flex flex-col gap-10'>
						<div>
							<h3 className='text-white pl-2 text-2xl mb-4 font-bold'>
								О себе
							</h3>
							<div className='card p-5'>
								<div className='text-front text-lg'>
									{user.bio ||
										'Пользователь еще не заполнил информацию о себе.'}
								</div>
							</div>
						</div>

						<div className='space-y-4'>
							<div className='flex items-center justify-between px-1'>
								<h3 className='text-white pl-2 text-2xl font-bold'>
									Активные проекты
								</h3>
								<span className='text-[12px] font-bold text-header-icons bg-white/5 px-2 py-1 rounded-md'>
									Всего: {user.active_projects?.length || 0}
								</span>
							</div>

							<div className='grid grid-cols-1 gap-2'>
								{user.active_projects?.length > 0 ? (
									user.active_projects.map(project => (
										<ProjectCardMinimal
											key={project.id}
											project={project}
											userId={userId}
										/>
									))
								) : (
									<div className='p-10 border-2 border-dashed border-card-border rounded-3xl text-center text-header-icons italic'>
										Нет активных проектов
									</div>
								)}
							</div>
						</div>

						{user?.skills?.length > 0 && (
							<div>
								<h3 className='text-white pl-2 text-2xl font-bold mb-4'>
									Навыки
								</h3>
								<div className='card p-5'>
									<UserSkillsList skills={user.skills} />
								</div>
							</div>
						)}
					</main>
				</div>
				<div></div>
			</Container>
		</section>
	);
};

export default ProfilePage;
