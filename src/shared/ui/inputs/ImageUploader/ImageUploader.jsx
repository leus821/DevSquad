'use client';
import { useState, useRef } from 'react';
import { Camera, X, Edit2 } from 'lucide-react';
import { getCroppedImg } from '@/shared/lib/utils/cropImage';
import { CropModal } from '@/shared/ui';
import { cn } from '@/shared/lib/utils/commonUtils';

const ImageUploader = ({ onImageChange, initialImage = null, className }) => {
	const [tempImage, setTempImage] = useState(null);
	const [preview, setPreview] = useState(initialImage);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

	const fileInputRef = useRef(null);

	const handleFileChange = e => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setTempImage(reader.result);
				setCrop({ x: 0, y: 0 });
				setZoom(1);
				setIsModalOpen(true);
			};
			reader.readAsDataURL(file);
			e.target.value = '';
		}
	};

	const handleSave = async () => {
		try {
			const cropped = await getCroppedImg(tempImage, croppedAreaPixels);
			setPreview(cropped);
			setIsModalOpen(false);
			onImageChange?.(cropped);
		} catch (e) {
			console.error('Ошибка при обрезке:', e);
		}
	};

	const handleBoxClick = () => {
		if (preview) {
			setIsModalOpen(true);
		} else {
			fileInputRef.current.click();
		}
	};

	const handleRemove = e => {
		e.stopPropagation();
		setPreview(null);
		setTempImage(null);
		onImageChange?.(null);
	};

	return (
		<>
			<div
				onClick={handleBoxClick}
				className={cn(
					'w-45 aspect-square border-2 border-dashed border-card-border rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all relative group overflow-hidden',
					className,
				)}
			>
				<input
					type='file'
					ref={fileInputRef}
					onChange={handleFileChange}
					accept='image/*'
					className='hidden'
				/>

				{preview ? (
					<>
						<img
							src={preview}
							alt='Preview'
							className='w-full h-full object-cover'
						/>
						<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity'>
							<Edit2 size={24} className='text-white' />
						</div>
						<button
							onClick={handleRemove}
							className='absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white z-20 hover:scale-110 transition-transform'
						>
							<X size={14} />
						</button>
					</>
				) : (
					<div className='flex flex-col items-center gap-2'>
						<Camera size={40} className='text-header-icons' />
						<span className='text-xs font-bold text-white text-center'>
							Загрузить фото
						</span>
					</div>
				)}
			</div>

			<CropModal
				isOpen={isModalOpen}
				image={tempImage}
				crop={crop}
				zoom={zoom}
				onCropChange={setCrop}
				onZoomChange={setZoom}
				onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
				onSave={handleSave}
				onClose={() => setIsModalOpen(false)}
				onSelectNew={() => fileInputRef.current.click()}
			/>
		</>
	);
};

export default ImageUploader;
