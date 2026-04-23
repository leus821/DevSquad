'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, ImageIcon, Edit2, Loader2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils/commonUtils';

import CropModal from './CropModal';
import { getCroppedImg } from '../lib/cropImage';

const MultiImageUploader = ({
	value = [],
	onChange,
	maxFiles = 10,
	label = 'Галерея проекта',
	error,
}) => {
	// Состояния для кроппера
	const [isCropOpen, setIsCropOpen] = useState(false);
	const [imageToCrop, setImageToCrop] = useState(null);
	const [editIndex, setEditIndex] = useState(null);

	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

	// 1. Логика массовой загрузки (Dropzone)
	const onDrop = useCallback(
		acceptedFiles => {
			const remainingSlots = maxFiles - value.length;
			const filesToProcess = acceptedFiles.slice(0, remainingSlots);

			filesToProcess.forEach(file => {
				const reader = new FileReader();
				reader.onload = () => {
					const newImage = reader.result;
					// Добавляем в массив, если такой картинки еще нет
					if (!value.includes(newImage)) {
						onChange(prev => [...prev, newImage]);
					}
				};
				reader.readAsDataURL(file);
			});
		},
		[value, onChange, maxFiles],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'image/*': [] },
		maxFiles: maxFiles - value.length,
		disabled: value.length >= maxFiles,
	});

	// 2. Открытие кроппера для конкретного фото
	const handleStartEdit = (src, index) => {
		setImageToCrop(src);
		setEditIndex(index);
		setCrop({ x: 0, y: 0 });
		setZoom(1);
		setIsCropOpen(true);
	};

	// 3. Сохранение результата кропа
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
			{/* Header блока */}
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<div className='p-2 bg-brand-purple/10 rounded-lg text-brand-purple'>
						<ImageIcon size={20} />
					</div>
					<h3 className='text-white font-bold text-xl'>{label}</h3>
				</div>
				<span className='text-[10px] text-header-icons font-black uppercase tracking-widest px-3 py-1 border border-card-border rounded-full'>
					{value.length} / {maxFiles} фото
				</span>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
				<AnimatePresence mode='popLayout'>
					{/* Список загруженных фото */}
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

							{/* Overlay управления */}
							<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3'>
								<button
									type='button'
									onClick={() => handleStartEdit(src, index)}
									className='p-2.5 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-md text-white transition-all hover:scale-110'
								>
									<Edit2 size={20} />
								</button>
								<button
									type='button'
									onClick={() => removeImage(index)}
									className='p-2.5 bg-red-500/80 hover:bg-red-500 rounded-xl backdrop-blur-md text-white transition-all hover:scale-110'
								>
									<Trash2 size={20} />
								</button>
							</div>
						</motion.div>
					))}

					{/* Кнопка "Добавить" (Dropzone) */}
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

			{/* Кроппер (тот же самый компонент) */}
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
				aspect={16 / 9}
			/>

			{error && <p className='text-xs text-red-500 mt-2'>{error.message}</p>}
		</div>
	);
};

export default MultiImageUploader;
