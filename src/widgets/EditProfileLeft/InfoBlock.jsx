'use client';

import { Controller } from 'react-hook-form';
import { Input } from '@/shared/ui';
import { GraduationCap, Languages, MapPin } from 'lucide-react';

const InfoBlock = ({errors, control }) => {
	return (
		<div className='card p-6 flex flex-col gap-5'>
			<h3 className='text-xl font-semibold'>Инфо</h3>
			<Controller
				name='location'
				control={control}
				render={({ field }) => (
					<Input
						{...field}
						error={errors.location}
						icon={MapPin}
						label='Локация'
						placeholder='Пермь, +2 МСК'
					/>
				)}
			/>

			<Controller
				name='languages'
				control={control}
				render={({ field }) => (
					<Input
						{...field}
						error={errors.Languages}
						icon={Languages}
						label='Языки'
						placeholder='Русский, English (B2)'
					/>
				)}
			/>

			<Controller
				name='education'
				control={control}
				render={({ field }) => (
					<Input
						{...field}
						icon={GraduationCap}
						error={errors.education}
						label='Образование'
						placeholder='НИУ ВШЭ Пермь'
					/>
				)}
			/>
		</div>
	);
};

export default InfoBlock;
