'use client';

import { Controller, useFormState } from 'react-hook-form';
import { Input, ErrorField } from '@/shared/ui';
import { GraduationCap, Languages, MapPin } from 'lucide-react';

	const InfoBlock = ({errors, control }) => {
	const { errors: stateErrors } = useFormState({ control });
	const infoError = stateErrors.location?.message;
	return (
		<div className='card p-6 flex flex-col gap-5'>
			<div className='flex items-center justify-between'>
				<h3 className='text-xl font-semibold'>Инфо</h3>
				<span className='text-[10px] text-header-icons font-bold uppercase tracking-wider'>хотя бы 1</span>
			</div>
			{infoError && <ErrorField errorText={infoError} />}
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
