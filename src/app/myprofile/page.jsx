'use client';

import { EditProfileForm, useProfileEdit } from '@/features/edit-profile';
import { Save } from 'lucide-react';
import { Button } from '@/shared/ui';

const ProfileEditPage = () => {
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
			console.log('ura');
		}
	};

	return (
		!isLoading && (
			<section className='container-wide py-10'>
				<div className='flex justify-between items-center mb-8'>
					<h1 className='text-3xl font-bold text-white'>
						Редактирование профиля
					</h1>
					<div className='flex gap-3'>
						<Button variant='ghost'>Отмена</Button>
						<Button onClick={handleSubmit(onSubmit)} className='gap-2'>
							<Save size={18} />
							{isSubmitting ? 'Сохраняем...' : 'Сохранить изменения'}
						</Button>
					</div>
				</div>
				<EditProfileForm control={control} errors={errors} />
			</section>
		)
	);
};

export default ProfileEditPage;
