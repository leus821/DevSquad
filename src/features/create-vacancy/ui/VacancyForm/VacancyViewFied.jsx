'use client';

import { ImageUploader, TextArea } from '@/shared/ui';
import { Controller } from 'react-hook-form';

const VacancyViewFeed = ({ control, errors }) => {
	return (
		<div className='card p-8 space-y-8'>
			<div className='flex items-center gap-3 border-b border-card-border pb-4'>
				<h2 className='text-xl font-bold text-white'>Вид в ленте</h2>
			</div>
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
								initialImage={field?.thumbnail_url || null}
								aspect={16 / 10}
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
							Этот текст вместе с обложкой увидят кандидаты, когда будут листать
							общую ленту.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VacancyViewFeed;
