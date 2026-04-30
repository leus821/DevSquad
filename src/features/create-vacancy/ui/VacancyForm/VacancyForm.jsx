'use client';
import { Controller } from 'react-hook-form';
import {
	Input,
	TextArea,
	ImageUploader,
	SelectCustom,
	MultiCreatableSelect,
	RichEditor,
} from '@/shared/ui';
import { Briefcase, Zap, FileText } from 'lucide-react';
import { SUGGESTED_SKILLS } from '@/shared/static/skills';

const EXPERIENCE_OPTIONS = [
	{ value: 'none', label: 'Без опыта', id: 1 },
	{ value: '1-3', label: 'От 1 до 3 лет', id: 2 },
	{ value: '3-5', label: 'От 3 до 5 лет', id: 3 },
	{ value: '5+', label: 'Более 5 лет', id: 4 },
];

const VacancyForm = ({ control, errors }) => {
	return (
		<div className='flex flex-col gap-10'>
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
								label='Название роли'
								placeholder='Например: Frontend React Разработчик'
								required
								error={errors.role}
							/>
						)}
					/>

					<Controller
						name='experience'
						control={control}
						render={({ field }) => (
							<SelectCustom
								label='Опыт работы'
								options={EXPERIENCE_OPTIONS}
								value={field.value}
								onChange={field.onChange}
								error={errors.experience}
							/>
						)}
					/>
				</div>

				<Controller
					name='tech_stack'
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

			{/* БЛОК 2: ДЛЯ ЛЕНТЫ (Исправленная ровная верстка) */}
			<div className='card p-8 space-y-8'>
				<div className='flex items-center gap-3 border-b border-card-border pb-4'>
					<h2 className='text-xl font-bold text-white'>Вид в ленте</h2>
				</div>

				{/* Используем items-stretch, чтобы TextArea и Uploader были одной высоты */}
				<div className='grid grid-cols-1 xl:grid-cols-2 gap-10 items-stretch'>
					<div className='flex flex-col gap-4'>
						<label className='text-xs font-bold text-header-icons uppercase tracking-widest ml-1'>
							Обложка вакансии (16:9)
						</label>
						<Controller
							name='thumbnail_url'
							control={control}
							render={({ field }) => (
								<ImageUploader
									onImageChange={field.onChange}
									className='w-full aspect-video rounded-3xl border-dashed border-2 grow'
								/>
							)}
						/>
					</div>

					<div className='flex flex-col gap-4'>
						<label className='text-xs font-bold text-header-icons uppercase tracking-widest ml-1'>
							Короткий Хук
						</label>
						<div className='flex flex-col h-full'>
							<Controller
								name='hook'
								control={control}
								render={({ field }) => (
									<TextArea
										{...field}
										watchValue={field.value}
										placeholder='Напишите 1-2 предложения, которые зацепят внимание...'
										className='grow min-h-35 text-base leading-relaxed'
										maxLength={160}
										error={errors.hook}
									/>
								)}
							/>

							<p className='text-[10px] text-header-icons mt-2 leading-relaxed opacity-70'>
								Этот текст вместе с обложкой увидят кандидаты, когда будут
								листать общую ленту.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* БЛОК 3: ПОЛНОЕ ОПИСАНИЕ */}
			<div className='card p-8 space-y-6'>
				<div className='flex items-center gap-3 border-b border-card-border pb-4'>
					<div className='p-2 bg-deep-lime/10 rounded-lg text-deep-lime'>
						<FileText size={20} />
					</div>
					<h2 className='text-xl font-bold text-white'>Подробное описание</h2>
				</div>

				<div className='space-y-4'>
					<p className='text-sm text-header-icons leading-relaxed'>
						Опишите задачи, требования и условия. Используйте списки и выделение
						жирным для акцентов.
					</p>

					<Controller
						name='full_description'
						control={control}
						render={({ field }) => (
							<RichEditor
								value={field.value}
								onChange={field.onChange}
								error={errors.full_description}
							/>
						)}
					/>
				</div>
			</div>
		</div>
	);
};

export default VacancyForm;
