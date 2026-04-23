import { Image, Modal } from '@/shared/ui';

const ImageViewer = ({ isOpen, onClose, src }) => (
	<Modal
		isOpen={isOpen}
		onClose={onClose}
		maxWidth='max-w-4xl'
		className='p-0 border-none bg-transparent shadow-none'
	>
		<Image
			alt='Full view'
			className='max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain'
			src={src}
		/>
	</Modal>
);

export default ImageViewer;
