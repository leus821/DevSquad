'use client';
import { Container } from '@/shared/ui';
import { UserProfileHero, useProfile } from '@/entities/user';
import { useParams } from 'next/navigation';
import { UserProfileLeft, UserProjects, UserSkillsList } from '@/widgets';

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
				<UserProfileHero user={user} isOwner={user.id === userId} />

				<div className='grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-10 items-start'>
					<UserProfileLeft
						status={user.status}
						hours_available={user.hours_available}
						location={user.location}
						languages={user.languages}
						education={user.education}
					/>

					<main className='flex flex-col gap-10'>
						<div className='card p-10 space-y-6 relative overflow-hidden'>
							<h3 className='text-white text-2xl font-black tracking-tight'>
								О себе
							</h3>
							<div className='prose prose-invert max-w-none text-header-icons text-lg leading-relaxed'>
								{user.bio || 'Пользователь еще не заполнил информацию о себе.'}
							</div>
						</div>

						{user.skills.length > 0 && <UserSkillsList skills={user.skills} />}

						{user.founded_projects?.length > 0 && (
							<UserProjects projects={user.founded_projects} />
						)}
					</main>
				</div>
			</Container>
		</section>
	);
};

export default ProfilePage;
