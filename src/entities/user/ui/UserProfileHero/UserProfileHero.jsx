'use client';
import { UserAvatar } from '@/entities/user';
import { LinksList, Button } from '@/shared/ui';
import Link from 'next/link';

const ProfileHero = ({ user, isOwner }) => {
	const socialLinks = [
		{ url: user.github_url },
		{ url: `https://t.me/${user.telegram?.replace('@', '')}` },
		

	].filter(link => link.url);

	return (
		<div className='mb-10 rounded-2xl project-header-border'>
			<div className='flex gap-10 items-center relative pl-16 py-6 pr-8'>
				<UserAvatar
					avatarUrl={user.avatar_url}
					name={user.full_name}
					className='w-45 border-primary aspect-square border-2 rounded-full shrink-0'
				/>

				<div className='w-full min-w-0'>
					<div>
						<h1 className='text-[50px] line-clamp-2 w-full leading-10 font-bold wrap-break-word text-white'>
							{user.full_name}
						</h1>
					</div>
					<div className='gap-3 mt-1'>
						<p className='text-front text-lg font-medium tracking-tight mb-2'>
							@{user.username}
						</p>
						<p className='text-front text-xl font-bold'>
							{user.role || 'Разработчик на реакте чисто'}
						</p>
						<div className='flex gap-2 justify-end'>
							<LinksList links={user.links} />
							{isOwner && (
								<Button asChild>
									<Link href='/myprofile'>Редактировать профиль</Link>
								</Button>							
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileHero;
