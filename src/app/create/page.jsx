import { ImageUploader } from '@/features/upload-image';

const CreatingPage = () => {
	return (
		<section>
			<div className='max-w-[1500px] mx-auto'>
				<div>
					<ImageUploader />
				</div>
			</div>
		</section>
	);
};

export default CreatingPage;
