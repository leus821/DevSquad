import { ImageUploader } from '@/shared/ui';
import { Input } from '@/shared/ui';

const CreateProjectFormHeader = ({ control, errors }) => {
	return (
		<div className='card p-8'>
			<div className='flex flex-col md:flex-row gap-8 relative z-10'>
				<div className='shrink-0 flex flex-col items-center gap-3'>
					<ImageUploader className='w-40 h-40' />
				</div>

				<div className='flex-1 space-y-6'>
					<Input label='Название проекта' placeholder='Например: STUD HOME' />
					<Input
						label='Слоган'
						placeholder='Платформа для прогноза погоды и управления...'
					/>

					<div className='flex flex-wrap items-center gap-8 pt-2'>
						<div className='flex items-center gap-3'>
							<span className='text-xs font-bold text-header-icons uppercase tracking-wider'>
								Статус:
							</span>
							<div className='flex gap-2 p-1 rounded-xl border border-card-border bg-black/20'>
								{['Идея', 'MVP', 'Запущен'].map((status, i) => (
									<button
										key={status}
										type='button'
										className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
											i === 0
												? 'bg-card-border text-white'
												: 'text-header-icons hover:text-white hover:bg-card-border/50'
										}`}
									>
										{status}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateProjectFormHeader;
