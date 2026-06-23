'use client';
import { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, ImageIcon, Edit2 } from 'lucide-react';
import { getCroppedImg } from '@/shared/lib/utils/cropImage';
import { cn } from '@/shared/lib/utils/commonUtils';
import { ErrorField, CropModal, RemoveButton } from '@/shared/ui';

const MultiImageUploader = ({ value = [], onChange, maxFiles = 10, error }) => {
	const [isCropOpen, setIsCropOpen] = useState(false);
	const [imageToCrop, setImageToCrop] = useState(null);
	const [editIndex, setEditIndex] = useState(null);

	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

	const replaceInputRef = useRef(null);

	const readFile = file => {
		return new Promise(resolve => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.readAsDataURL(file);
		});
	};

	const handleReplaceFile = e => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImageToCrop(reader.result);
				setCrop({ x: 0, y: 0 });
				setZoom(1);
			};
			reader.readAsDataURL(file);
			e.target.value = '';
		}
	};

	const onDrop = useCallback(
		async acceptedFiles => {
			const remainingSlots = maxFiles - value.length;
			if (remainingSlots <= 0) return;

			const filesToProcess = acceptedFiles.slice(0, remainingSlots);
			const newImages = await Promise.all(
				filesToProcess.map(file => readFile(file)),
			);
			const uniqueImages = newImages.filter(img => !value.includes(img));

			if (uniqueImages.length > 0) {
				onChange([...value, ...uniqueImages]);
			}
		},
		[value, onChange, maxFiles],
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'image/*': [] },
		maxFiles: maxFiles - value.length,
		disabled: value.length >= maxFiles,
	});

	const handleStartEdit = (src, index) => {
		setImageToCrop(src);
		setEditIndex(index);
		setCrop({ x: 0, y: 0 });
		setZoom(1);
		setIsCropOpen(true);
	};

	const handleSaveCropped = async () => {
		try {
			const cropped = await getCroppedImg(imageToCrop, croppedAreaPixels);
			const newValue = [...value];
			newValue[editIndex] = cropped;
			onChange(newValue);
			setIsCropOpen(false);
		} catch (e) {
			console.error('Ошибка при обрезке:', e);
		}
	};

	const removeImage = indexToRemove => {
		onChange(value.filter((_, index) => index !== indexToRemove));
	};

	return (
		<div className='card p-8 space-y-6'>
			<input
				type='file'
				ref={replaceInputRef}
				onChange={handleReplaceFile}
				accept='image/*'
				className='hidden'
			/>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
				<AnimatePresence mode='popLayout'>
					{value.map((src, index) => (
						<motion.div
							key={src}
							layout
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
							className='relative aspect-video rounded-2xl overflow-hidden border border-card-border group'
						>
							<img
								src={src}
								className='w-full h-full object-cover'
								alt='Preview'
							/>

							<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3'>
								<button
									type='button'
									onClick={() => handleStartEdit(src, index)}
									className='p-2.5 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-md text-white transition-all hover:scale-110'
								>
									<Edit2 size={20} />
								</button>
								<RemoveButton onClick={() => removeImage(index)} />
							</div>
						</motion.div>
					))}

					{value.length < maxFiles && (
						<motion.div
							layout
							{...getRootProps()}
							className={cn(
								'aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300',
								isDragActive
									? 'border-brand-purple bg-brand-purple/5'
									: 'border-card-border bg-white/5 hover:bg-white/10 hover:border-brand-purple/50',
							)}
						>
							<input {...getInputProps()} />
							<div className='p-3 bg-brand-purple/10 rounded-full text-brand-purple group-hover:scale-110 transition-transform'>
								<Plus size={24} />
							</div>
							<span className='text-xs font-bold text-header-icons uppercase tracking-widest'>
								{isDragActive ? 'Бросайте сюда' : 'Добавить фото'}
							</span>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<CropModal
				isOpen={isCropOpen}
				image={imageToCrop}
				crop={crop}
				zoom={zoom}
				onCropChange={setCrop}
				onZoomChange={setZoom}
				onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
				onSave={handleSaveCropped}
				onClose={() => setIsCropOpen(false)}
				onSelectNew={() => replaceInputRef.current?.click()}
				aspect={16 / 9}
			/>

			{error && <ErrorField errorText={error.message} />}
		</div>
	);
};

export default MultiImageUploader;
