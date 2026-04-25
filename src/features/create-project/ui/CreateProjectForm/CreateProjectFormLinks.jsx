'use client';
import { Link2 } from 'lucide-react';
import { LinksEditor } from '@/shared/ui';
import { Controller } from 'react-hook-form';

const CreateProjectFormLinks = ({ control, errors }) => {
	return (
		<div className='card p-8 space-y-6'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<div className='p-2 bg-brand-purple/10 rounded-lg text-brand-purple'>
						<Link2 size={20} />
					</div>
					<h3 className='text-white font-bold text-xl'>Ссылки на ресурсы</h3>
				</div>
			</div>

			<Controller
				name='links'
				control={control}
				render={({ field }) => (
					<LinksEditor
						value={field.value || []}
						onChange={field.onChange}
						errors={errors?.links}
						maxLinks={3}
					/>
				)}
			/>
		</div>
	);
};

export default CreateProjectFormLinks;
