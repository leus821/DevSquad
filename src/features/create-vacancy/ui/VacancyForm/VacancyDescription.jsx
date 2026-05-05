import { RichEditor } from '@/shared/ui';
import { Controller } from 'react-hook-form';

const VacancyDescription = ({ control, errors }) => {
	return (
		<div className='card p-8 space-y-6'>
			<div className='flex items-center gap-3 border-b border-card-border pb-4'>
				<h2 className='text-xl font-bold text-white'>Подробное описание</h2>
			</div>

			<div className='space-y-4'>
				<p className='text-sm text-header-icons leading-relaxed'>
					Опишите задачи, требования и условия. Используйте списки и выделение
					жирным для акцентов.
				</p>

				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<RichEditor
							value={field.value}
							onChange={field.onChange}
							error={errors.description}
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default VacancyDescription;
