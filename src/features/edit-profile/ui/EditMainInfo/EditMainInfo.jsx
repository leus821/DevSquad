'use client';

import { ImageUploader } from '@/shared/ui';
import { Input } from '@/shared/ui';
import { Controller } from 'react-hook-form';

const EditMainInfo = ({ errors, control }) => {
	return (
		<div className='card p-8 flex flex-col md:flex-row gap-8 items-center md:items-start'>
			<div className='flex flex-col items-center gap-3'>
				<Controller
					name='avatar_url'
					control={control}
					render={({ field }) => (
						<ImageUploader
							onImageChange={field.onChange}
							initialImage={field.value}
							className='w-40 h-40'
						/>
					)}
				/>
				<span className='text-[10px] text-header-icons uppercase font-bold'>
					Сменить фото
				</span>
			</div>

			<div className='flex flex-col gap-5 grow w-full'>
				<div className='flex gap-5'>
					<Controller
						name='name'
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								label='Имя'
								placeholder='Даниил'
								error={errors.name}
							/>
						)}
					/>
					<Controller
						name='surname'
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								label='Фамилия'
								placeholder='Колбасенко'
								error={errors.surname}
							/>
						)}
					/>
				</div>
				<Controller
					name='role'
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							label='Ваша роль'
							error={errors.role}
							placeholder='Senior Fullstack Developer | React & Go'
						/>
					)}
				/>
				<Controller
					name='username'
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							error={errors.username}
							label='Никнейм (@)'
							placeholder='daniil_dev'
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default EditMainInfo;
