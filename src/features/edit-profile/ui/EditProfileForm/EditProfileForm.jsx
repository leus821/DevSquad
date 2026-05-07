import { SkillsSelect } from '../..';
import EditProfileLeft from '../EditProfileLeft';
import EditMainInfo from '../EditMainInfo/EditMainInfo';
import { TextArea } from '@/shared/ui';
import { Controller } from 'react-hook-form';

const EditProfileForm = ({ control, errors, bioValue }) => {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 items-start'>
			<EditProfileLeft control={control} errors={errors} />

			<div className='flex flex-col gap-8'>
				<EditMainInfo control={control} errors={errors} />

				<div className='card p-5 '>
					<h3 className='text-white text-lg font-bold mb-2'>О себе</h3>
					<Controller
						name='bio'
						control={control}
						render={({ field }) => (
							<TextArea
								{...field}
								maxLength={2000}
								watchValue={field.value}
								error={errors.bio}
								placeholder='Расскажите о себе (минимум 20 символов)'
							/>
						)}
					/>
				</div>
				<div>
					<h3 className='text-white text-lg font-bold mb-2'>
						Технологический стек
					</h3>
					<SkillsSelect control={control} error={errors.skills} />
				</div>
			</div>
		</div>
	);
};

export default EditProfileForm;
