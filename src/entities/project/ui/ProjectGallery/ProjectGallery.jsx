import { Image } from '@/shared/ui';

const ProjectGallery = ({ gallery }) => {
	if (!gallery || gallery.length === 0) return null;
	return (
		<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
			{gallery.map((item, index) => (
				<li
					className='relative aspect-video rounded-2xl overflow-hidden border border-card-border bg-input group'
					key={index}
				>
					<Image alt='Элемент галереи проекта' src={item} className='' />
				</li>
			))}
		</ul>
	);
};

export default ProjectGallery;
