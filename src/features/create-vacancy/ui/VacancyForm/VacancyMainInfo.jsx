'use client';

import { SUGGESTED_SKILLS } from '@/shared/static/skills';
import { EXPERIENCE_OPTIONS } from '@/shared/static/vacancy';
import { Input, MultiCreatableSelect, SelectCustom } from '@/shared/ui';
import { Controller } from 'react-hook-form';

const VacancyMainInfo = ({ control, errors }) => {
	return (
		<div className='card p-8 space-y-8'>
			<div className='flex items-center gap-3 border-b border-card-border pb-4'>
				<h2 className='text-xl font-bold text-white'>Кто вам нужен?</h2>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<Controller
					name='role'
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							watchValue={field.value}
							label='Название роли'
							placeholder='Например: Frontend React Разработчик'
							required
							error={errors.role}
							maxLength={60}
						/>
					)}
				/>

				<Controller
					name='experience'
					control={control}
					render={({ field }) => (
						<SelectCustom
							value={field.value}
							label='Опыт работы'
							options={EXPERIENCE_OPTIONS}
							onChange={field.onChange}
							error={errors.experience}
						/>
					)}
				/>
			</div>

			<Controller
				name='stack'
				control={control}
				render={({ field }) => (
					<MultiCreatableSelect
						label='Технологический стек'
						placeholder='React, TypeScript, Zustand...'
						value={field.value || []}
						onChange={field.onChange}
						suggestions={SUGGESTED_SKILLS}
						error={errors.stack}
					/>
				)}
			/>
		</div>
	);
};

export default VacancyMainInfo;
