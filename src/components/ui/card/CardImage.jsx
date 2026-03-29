import ProjectStatus from '../ProjectStatus';

const CardImage = ({ imageUrl, status }) => {
	return (
		<div className='relative w-full aspect-16/7 overflow-hidden rounded-t-xl bg-slate-900'>
			<img
				src={imageUrl}
				className='absolute inset-0 w-full h-full object-cover blur-md opacity-80 brightness-110 scale-125'
				alt='background blur'
			/>
			<img
				src={imageUrl}
				className='relative w-full h-full object-contain'
				alt='project preview'
			/>

			<div className='absolute top-3 left-3 pointer-events-auto'>
				<svg
					className='w-6 h-8 text-indigo-500 fill-current drop-shadow-md'
					viewBox='0 0 24 24'
				>
					<path d='M5 3v18l7-5 7 5V3z' />
				</svg>
			</div>

			<ProjectStatus status={status} />
		</div>
	);
};

export default CardImage;
