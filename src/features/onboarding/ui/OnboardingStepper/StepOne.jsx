import { useFormState } from 'react-hook-form';
import { ImageUploader } from '@/features/upload-image';
import { Input } from '@/shared/ui';
import { Briefcase } from 'lucide-react';

const StepOne = ({ register, control, setValue }) => {
	const { errors } = useFormState({ control });

	return (
		<div className='flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500'>
			<div className='flex justify-center mb-4'>
				<div className='text-center group'>
					<ImageUploader
						onImageChange={file => setValue('avatar_url', file)}
						className='w-32 h-32 rounded-full border-4 border-brand-purple/20'
					/>
					<p className='text-[10px] text-header-icons font-bold uppercase mt-3 tracking-widest group-hover:text-white transition-colors'>
						Ваше фото
					</p>
				</div>
			</div>
			<Input
				className='mt-auto'
				label='Специализация'
				icon={Briefcase}
				{...register('role')}
				error={errors.role}
				placeholder='Senior Fullstack Developer'
			/>
		</div>
	);
};

export default StepOne;
