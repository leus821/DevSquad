import { Input } from '@/shared/ui';
import { Globe } from 'lucide-react';

const StepThree = ({ register }) => (
	<div className='flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
		<div className='space-y-2'>
			<label className='text-xs font-bold text-header-icons uppercase ml-1 tracking-wider'>
				Краткое био
			</label>
			<textarea
				className='w-full min-h-35 bg-black/30 border border-card-border rounded-[20px] p-5 text-white focus:border-brand-purple outline-none resize-none leading-relaxed'
				placeholder='Расскажите о своих сильных сторонах и интересах...'
				{...register('bio')}
			/>
		</div>
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
			<Input
				label='GitHub'
				icon={Globe}
				placeholder='github.com/username'
				registration={register('github_url')}
			/>
			<Input
				label='Telegram'
				placeholder='@username'
				registration={register('telegram')}
			/>
		</div>
	</div>
);

export default StepThree;
