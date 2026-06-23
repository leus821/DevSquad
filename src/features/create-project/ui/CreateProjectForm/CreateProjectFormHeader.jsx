'use client';

import { PROJECT_INPUTS_MAX_LENGTH } from '@/shared/static/project';
import { ImageUploader, StatusSwitcher } from '@/shared/ui';
import { Input } from '@/shared/ui';
import { Controller } from 'react-hook-form';

const CreateProjectFormHeader = ({ control, register, errors }) => {
	return (
		<div className='card p-8'>
			<div className='flex flex-col md:flex-row gap-8 relative z-10'>
				<div className='shrink-0 flex flex-col items-center gap-3'>
					<Controller
						name='logo_url'
						control={control}
						render={({ field }) => (
							<ImageUploader
								initialImage={field.value}
								onImageChange={field.onChange}
								className='w-40 h-40'
							/>
						)}
					/>
				</div>

				<div className='flex-1 space-y-6'>
					<Controller
						name='name'
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								watchValue={field.value}
								error={errors.name}
								label='Название проекта'
								placeholder='Например: STUD HOME'
								maxLength={PROJECT_INPUTS_MAX_LENGTH.name}
								required={true}
							/>
						)}
					/>
					<Controller
						name='slogan'
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								watchValue={field.value}
								error={errors.slogan}
								label='Слоган'
								placeholder='Платформа для прогноза погоды и управления...'
								maxLength={PROJECT_INPUTS_MAX_LENGTH.slogan}
								required={true}
							/>
						)}
					/>

					<div className='flex flex-wrap items-center gap-8 pt-2'>
						<div className='flex items-center gap-3'>
							<span className='text-xs font-bold text-header-icons uppercase '>
								Статус:
							</span>
							<Controller
								name='status'
								control={control}
								render={({ field }) => (
									<StatusSwitcher
										activeValue={field.value}
										onClick={field.onChange}
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateProjectFormHeader;
