'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, ImageIcon, Edit2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils/commonUtils';
import CropModal from '@/features/upload-image/ui/CropModal'; // Используем твой готовый CropModal
import { getCroppedImg } from '@/features/upload-image/lib/cropImage';

const CreateProjectGallery = ({ onChange, value = [] }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [imageToCrop, setImageToCrop] = useState(null);
	const [editIndex, setEditIndex] = useState(null);

	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

	const onDrop = useCallback(
		acceptedFiles => {
			acceptedFiles.forEach(file => {
				const reader = new FileReader();
				reader.onload = () => {
					const newImage = reader.result;
					if (!value.includes(newImage)) {
						onChange([...value, newImage]);
					}
				};
				reader.readAsDataURL(file);
			});
		},
		[value, onChange],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'image/*': [] },
		maxFiles: 10,
	});

	// 2. Начало редактирования (клик по картинке)
	const handleEditImage = (src, index) => {
		setImageToCrop(src);
		setEditIndex(index);
		setCrop({ x: 0, y: 0 });
		setZoom(1);
		setIsModalOpen(true);
	};

	// 3. Сохранение обрезанного результата
	const handleSaveCropped = async () => {
		try {
			const cropped = await getCroppedImg(imageToCrop, croppedAreaPixels);
			const newValue = [...value];
			newValue[editIndex] = cropped; // Заменяем картинку по индексу
			onChange(newValue);
			setIsModalOpen(false);
		} catch (e) {
			console.error('Ошибка кроппера галереи:', e);
		}
	};

	const removeImage = (e, indexToRemove) => {
		e.stopPropagation(); // Чтобы не открылся кроппер при нажатии на корзину
		onChange(value.filter((_, index) => index !== indexToRemove));
	};

	return (
		<div className='card p-8 space-y-6'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<div className='p-2 bg-brand-purple/10 rounded-lg text-brand-purple'>
						<ImageIcon size={20} />
					</div>
					<h3 className='text-white font-bold text-xl'>Галерея проекта</h3>
				</div>
				<span className='text-[10px] text-header-icons font-black uppercase tracking-widest px-3 py-1 border border-card-border rounded-full'>
					{value.length} / 10 фото
				</span>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
				<AnimatePresence mode='popLayout'>
					{value.map((src, index) => (
						<motion.div
							key={src}
							layout
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
							onClick={() => handleEditImage(src, index)}
							className='relative aspect-video rounded-2xl overflow-hidden border border-card-border group cursor-pointer'
						>
							<img
								src={src}
								className='w-full h-full object-cover'
								alt='Preview'
							/>

							{/* Оверлей при наведении */}
							<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
								<Edit2 size={24} className='text-white' />
							</div>

							<button
								type='button'
								onClick={e => removeImage(e, index)}
								className='absolute top-3 right-3 p-2 rounded-xl bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 active:scale-90 z-10'
							>
								<Trash2 size={16} />
							</button>
						</motion.div>
					))}

					{value.length < 10 && (
						<motion.div
							layout
							{...getRootProps()}
							className={cn(
								'aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300',
								isDragActive
									? 'border-brand-purple bg-brand-purple/5'
									: 'border-card-border bg-white/5 hover:border-brand-purple/40',
							)}
						>
							<input {...getInputProps()} />
							<div className='p-3 bg-brand-purple/10 rounded-full text-brand-purple'>
								<Plus size={24} />
							</div>
							<span className='text-xs font-bold text-header-icons uppercase tracking-widest'>
								Добавить фото
							</span>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<CropModal
				isOpen={isModalOpen}
				image={imageToCrop}
				crop={crop}
				zoom={zoom}
				onCropChange={setCrop}
				onZoomChange={setZoom}
				onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
				onSave={handleSaveCropped}
				onClose={() => setIsModalOpen(false)}
				aspect={16 / 9}
			/>
		</div>
	);
};

export default CreateProjectGallery;
