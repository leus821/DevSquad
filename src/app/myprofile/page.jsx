'use client';

import { useAuth } from '@/app/providers/AuthContext';
import { EditProfileForm, useProfileEdit } from '@/features/edit-profile';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/shared/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ProfileEditPage = () => {
	const { user } = useAuth();
	const router = useRouter();
	const { form, updateProfile, isLoading, isSubmitting, isDirty, apiError } =
		useProfileEdit();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = form;

	const onSubmit = async data => {
		const result = await updateProfile(data);
		if (result.success) {
			router.push(`/user/${user.id}`);
		}
	};

	if (isLoading) {
		return (
			<div className='min-h-[50vh] flex flex-all-center'>
				<Loader2 className='animate-spin text-brand-purple' size={40} />
			</div>
		);
	}

	return (
		<section className='container-wide py-10'>
			<div className='flex justify-between items-center mb-8'>
				<div className='flex items-center gap-4'>
					<Link href='/myprojects' className='text-header-icons hover:text-white transition-colors'>
						<ArrowLeft size={24} />
					</Link>
					<h1 className='text-3xl font-bold text-white'>
						Редактирование профиля
					</h1>
				</div>
				<div className='flex gap-3'>
					<Button variant='ghost' asChild>
						<Link href='/myprojects'>Отмена</Link>
					</Button>
					<Button onClick={handleSubmit(onSubmit)} className='gap-2'>
						<Save size={18} />
						{isSubmitting ? 'Сохраняем...' : 'Сохранить изменения'}
					</Button>
				</div>
			</div>
			{apiError && (
				<div className='mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm'>
					{apiError}
				</div>
			)}
			<EditProfileForm control={control} errors={errors} />
		</section>
	);
};

export default ProfileEditPage;
