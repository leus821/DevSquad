'use client';

import { Controller, useFormState } from 'react-hook-form';
import { Github, Vk } from '@/shared/assets/icons';
import { Input, ErrorField } from '@/shared/ui';
import { Send } from 'lucide-react';

	const SocialsBlock = ({ errors, control }) => {
	const { errors: stateErrors } = useFormState({ control });
	const socialError = stateErrors.github_url?.message;
	return (
		<div className='card p-6 flex flex-col gap-5'>
			<div className='flex items-center justify-between'>
				<h3 className='text-xl font-semibold'>Соц. сети</h3>
				<span className='text-[10px] text-header-icons font-bold uppercase tracking-wider'>хотя бы 1</span>
			</div>
			{socialError && <ErrorField errorText={socialError} />}
			<Controller
				name='github_url'
				control={control}
				render={({ field }) => (
					<Input
						{...field}
						error={errors.github_url}
						icon={Github}
						label='GitHub'
						placeholder='github.com/username'
					/>
				)}
			/>
			<Controller
				name='telegram'
				control={control}
				render={({ field }) => (
					<Input
						{...field}
						error={errors.telegram}
						icon={Send}
						label='Telegram'
						placeholder='@username'
					/>
				)}
			/>

			<Input icon={Vk} label='LinkedIn' placeholder='linkedin.com/in/...' />
		</div>
	);
};

export default SocialsBlock;
