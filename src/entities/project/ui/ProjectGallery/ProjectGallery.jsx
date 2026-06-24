'use client';
import { useState } from 'react';
import { Image } from '@/shared/ui';
import { ImageViewer } from '@/shared/ui';

const ProjectGallery = ({ gallery }) => {
	const [selected, setSelected] = useState(null);
	if (!gallery || gallery.length === 0) return null;
	return (
		<>
			<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
				{gallery.map((item, index) => (
					<li
						className='relative aspect-video rounded-2xl overflow-hidden border border-card-border bg-input group cursor-pointer'
						key={index}
						onClick={() => setSelected(item)}
					>
						<Image alt='Элемент галереи проекта' src={item} className='' />
					</li>
				))}
			</ul>
			<ImageViewer
				isOpen={!!selected}
				onClose={() => setSelected(null)}
				src={selected}
			/>
		</>
	);
};

export default ProjectGallery;
