'use client';

import { useState } from 'react';
import { Input, TextArea, Button } from '@/shared/ui';
import { Plus, Sparkles, Trash2, Link2, ImagePlus } from 'lucide-react';
import CreateProjectFormHeader from './CreateProjectFormHeader';
import CreateProjectAbout from './CreateProjectAbout';
import CreateProjectGallery from './CreateProjectGallery';

const CreateProjectForm = () => {
	const [images, setImages] = useState([]);

	return (
		<form className='flex flex-col gap-10 pb-24'>
			<CreateProjectFormHeader />

			<CreateProjectAbout />
			{/* === ГАЛЕРЕЯ === */}
			<CreateProjectGallery
				value={images}
				onChange={newImages => setImages(newImages)}
			/>

			{/* === ССЫЛКИ === */}
			<div className='card p-8 space-y-6'>
				<h3 className='text-white font-bold text-xl'>Ссылки</h3>
				<div className='flex flex-col gap-4'>
					<div className='flex items-center gap-4'>
						<div className='w-1/3'>
							<Input placeholder='Название (например, Сайт)' />
						</div>
						<div className='flex-1'>
							<Input placeholder='https://...' />
						</div>
						<button
							type='button'
							className='text-header-icons hover:text-red-500 transition-colors p-2'
						>
							<Trash2 size={20} />
						</button>
					</div>

					<Button variant='secondary' size='sm' className='w-max gap-2 mt-2'>
						<Link2 size={16} /> Добавить ссылку
					</Button>
				</div>
			</div>
		</form>
	);
};

export default CreateProjectForm;
