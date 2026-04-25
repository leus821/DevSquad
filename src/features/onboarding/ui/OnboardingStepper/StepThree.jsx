import { useFormState, useWatch } from 'react-hook-form';
import { Input, TextArea } from '@/shared/ui';
import { Globe } from 'lucide-react';

const StepThree = ({ register, control, bio }) => {
	const { errors } = useFormState({ control });

	const bioValue = useWatch({
		control,
		name: 'bio',
		defaultValue: '',
	});

	return (
		<div className='flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
			<div className='space-y-2'>
				<label className='text-xs font-bold text-header-icons uppercase ml-1 tracking-wider'>
					Краткое био
				</label>
				<TextArea
					{...register('bio')}
					error={errors.bio}
					watchValue={bioValue}
					maxLength={2000}
					placeholder='Расскажите о своем опыте...'
				/>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<Input
					{...register('github_url')}
					label='GitHub'
					icon={Globe}
					placeholder='github.com/username'
				/>
				<Input
					{...register('telegram')}
					label='Telegram'
					placeholder='@username'
				/>
			</div>
		</div>
	);
};
export default StepThree;
