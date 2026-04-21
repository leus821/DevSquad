import { Controller, useFormState } from 'react-hook-form';
import UserStatusSelect from '@/entities/user/ui/UserStatusSelect/UserStatusSelect';
import { Input } from '@/shared/ui';

const StepTwo = ({ register, control }) => {
	const { errors } = useFormState({ control });

	return (
		<div className='flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
			<Controller
				name='status'
				control={control}
				render={({ field }) => (
					<UserStatusSelect
						onChange={field.onChange}
						error={errors?.status}
						value={field.value}
					/>
				)}
			/>
			<Input
				label='Никнейм для профиля (@)'
				placeholder='daniil_dev'
				{...register('username')}
				error={errors?.username}
			/>
			<Input
				label='Доступность (часов в неделю)'
				type='number'
				{...register('hours_available', { valueAsNumber: true })}
				error={errors.hours_available}
			/>
		</div>
	);
};

export default StepTwo;
