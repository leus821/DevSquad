import { TextArea } from '@/shared/ui';
import { Controller } from 'react-hook-form';

const TextAreaFields = [
	{
		label: 'Описание',
		name: 'description',
		placeholder: 'StudHome - Проект где все обращается в реальность...',
		rows: 4,
	},
	{
		label: 'Идея проекта',
		name: 'idea',
		placeholder: 'Мы хотим создать самый красивый и быстрый трекер...',
		rows: 3,
	},
	{
		label: 'Наш подход',
		name: 'approach',
		placeholder: 'Каждый год тысячи студентов тратят недели...',
		rows: 3,
	},
];

const CreateProjectAbout = ({ control, errors, watchValue }) => {
	return (
		<div className='card p-8 space-y-8'>
			<h2 className='text-xl font-bold text-white mb-6'>О проекте</h2>

			{TextAreaFields.map(item => (
				<div key={item.label} className='space-y-2 group'>
					<div className='flex items-center'>
						<label className='text-white font-bold text-lg'>{item.label}</label>
						<span
							className='text-primary text-lg leading-none'
							title='Обязательное поле'
						>
							*
						</span>
					</div>
					<Controller
						name={item.name}
						control={control}
						render={({ field }) => (
							<TextArea
								{...field}
								watchValue={field.value}
								placeholder={item.placeholder}
								maxLength={500}
								className='min-h-25 resize-none'
								rows={item.rows}
								error={errors && errors[item.name]}
							/>
						)}
					/>
				</div>
			))}
		</div>
	);
};

export default CreateProjectAbout;
