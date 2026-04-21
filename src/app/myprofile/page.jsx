'use client';

import { Controller, useWatch } from 'react-hook-form';
import { useProfileEdit } from '@/features/edit-profile';
import { Save } from 'lucide-react';
import { Button, MultiCreatableSelect, TextArea } from '@/shared/ui';
import { EditMainInfo, EditProfileLeft } from '@/widgets';
import { SUGGESTED_SKILLS } from '@/shared/static/skills';

const ProfileEditPage = () => {
	const { form, updateProfile, isLoading, isSubmitting, isDirty, apiError } =
		useProfileEdit();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = form;

	const bioValue = useWatch({
		control,
		name: 'bio',
		defaultValue: '',
	});

	const onSubmit = async data => {
		const result = await updateProfile(data);
		console.log(result);

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
							<Save size={18} />{' '}
							{isSubmitting ? 'Сохраняем...' : 'Сохранить изменения'}
						</Button>
					</div>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 items-start'>
					<EditProfileLeft
						control={control}
						register={register}
						errors={errors}
					/>

					<div className='flex flex-col gap-8'>
						<EditMainInfo
							control={control}
							register={register}
							errors={errors}
						/>

						<div className='card p-8 '>
							<h3 className='text-white text-lg font-bold'>О себе</h3>
							<TextArea
								maxLength={2000}
								registration={register('bio')}
								watchValue={bioValue}
								error={errors.bio}
								placeholder='Расскажите о себе (минимум 20 символов)'
							/>
						</div>
						<Controller
							name='skills'
							control={control}
							render={({ field }) => (
								<MultiCreatableSelect
									label='Технологический стек'
									placeholder='Начните вводить: React, Node, Docker...'
									value={field.value || []}
									onChange={field.onChange}
									suggestions={SUGGESTED_SKILLS}
									error={errors.skills}
								/>
							)}
						/>
					</div>
				</div>
			</section>
		)
	);
};

export default ProfileEditPage;
