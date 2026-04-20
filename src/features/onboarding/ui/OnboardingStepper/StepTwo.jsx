import { Input } from '@/shared/ui';

const StepTwo = ({ register, errors }) => {
	console.log(errors);

	return (
		<div className='flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
			<div className='space-y-2'>
				<label className='text-xs font-bold text-header-icons uppercase ml-1 tracking-wider'>
					Текущий статус
				</label>
				<select
					className='w-full bg-black/30 border border-card-border rounded-2xl px-5 py-4 text-white outline-none focus:border-brand-purple transition-all appearance-none'
					{...register('status')}
				>
					<option value='search'>Ищу проект</option>
					<option value='search'>В команде</option>
					<option value='search'>Занят</option>
					{errors.status && (
						<p className='text-[10px] text-red-500 ml-1 font-medium animate-in fade-in slide-in-from-top-1'>
							{errors.status.message}
						</p>
					)}
				</select>
			</div>
			<Input
				label='Никнейм для профиля (@)'
				placeholder='daniil_dev'
				registration={register('username')}
				error={errors?.username}
			/>
			<Input
				label='Доступность (часов в неделю)'
				type='number'
				registration={register('hours_available')}
				error={errors.hours_available}
			/>
		</div>
	);
};

export default StepTwo;
