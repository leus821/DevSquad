import { TextArea } from '@/shared/ui';

const TextAreaFields = [
	{
		label: 'Описание',
		name: 'description',
		placeholder: 'StudHome - Проект где все обращается в реальность...',
		rows: 3,
	},
	{
		label: 'Идея проекта',
		name: 'idea',
		placeholder: 'Мы хотим создать самый красивый и быстрый трекер...',
		rows: 4,
	},
	{
		label: 'Наш подход',
		name: 'approach',
		placeholder: 'Каждый год тысячи студентов тратят недели...',
		rows: 4,
	},
];

const CreateProjectAbout = ({ control, value, errors }) => {
	return (
		<div className='card p-8 space-y-8'>
			<h2 className='text-xl font-bold text-white mb-6'>О проекте</h2>

			{TextAreaFields.map(field => (
				<div key={field.label} className='space-y-2 group'>
					<div className='flex items-center justify-between'>
						<label className='text-white font-bold text-lg'>
							{field.label}
						</label>
					</div>
					<TextArea
						placeholder={field.placeholder}
						maxLength={500}
						className='min-h-25 resize-none'
						rows={field.rows}
					/>
				</div>
			))}
		</div>
	);
};

export default CreateProjectAbout;
