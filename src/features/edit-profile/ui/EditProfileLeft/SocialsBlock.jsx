'use client';

import { Controller } from 'react-hook-form';
import { Github, Vk } from '@/shared/assets/icons';
import { Input } from '@/shared/ui';
import { Send } from 'lucide-react';

const SocialsBlock = ({ errors, control }) => {
	return (
		<div className='card p-6 flex flex-col gap-5'>
			<h3 className='text-xl font-semibold'>Соц. сети</h3>
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
