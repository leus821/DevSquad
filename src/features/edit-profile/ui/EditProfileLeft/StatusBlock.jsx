'use client';

import UserStatusSelect from '@/entities/user/ui/UserStatusSelect/UserStatusSelect';
import { Input } from '@/shared/ui';
import { Controller } from 'react-hook-form';

const StatusBlock = ({ errors, control }) => {
	return (
		<div className='card p-6 flex flex-col gap-4'>
			<h3 className='text-xl font-semibold'>Статус <span className='text-primary'>*</span></h3>
			<div className='flex flex-col gap-3'>
				<label className='text-header-icons text-xs font-bold uppercase tracking-wider'>
					Ваша занятость
				</label>
				<Controller
					name='status'
					control={control}
					render={({ field }) => (
						<UserStatusSelect
							value={field.value}
							onChange={field.onChange}
							error={errors.status}
						/>
					)}
				/>
				<Controller
					name='hours_available'
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							error={errors.hours_available}
							label='Доступность часов в неделю'
							type='number'
							placeholder='20'
							className='ml-0'
							required
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default StatusBlock;
