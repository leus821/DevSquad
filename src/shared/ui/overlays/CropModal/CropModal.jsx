'use client';

import Cropper from 'react-easy-crop';
import { Button, Modal } from '@/shared/ui';
import { Check, Upload } from 'lucide-react';

const CropModal = ({
	isOpen,
	image,
	crop,
	zoom,
	onCropChange,
	onZoomChange,
	onCropComplete,
	onSave,
	onClose,
	onSelectNew,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
			<div className='relative w-full h-100 bg-black overflow-hidden'>
				{image && (
					<Cropper
						image={image}
						crop={crop}
						zoom={zoom}
						aspect={1}
						onCropChange={onCropChange}
						onZoomChange={onZoomChange}
						onCropComplete={onCropComplete}
						showGrid={true}
					/>
				)}
			</div>

			<div className='p-6 flex flex-col gap-6 bg-deep-dark relative z-10'>
				<div className='flex items-center gap-4'>
					<span className='text-xs font-bold text-header-icons uppercase'>
						Зум
					</span>
					<input
						type='range'
						value={zoom}
						min={1}
						max={3}
						step={0.1}
						onChange={e => onZoomChange(Number(e.target.value))}
						className='flex grow h-1.5 bg-card-border rounded-lg appearance-none cursor-pointer accent-primary'
					/>
				</div>

				<div className='flex justify-between gap-3'>
					<Button variant='ghost' onClick={onSelectNew} className='gap-2'>
						<Upload size={16} /> Другое фото
					</Button>
					<div className='flex gap-3'>
						<Button variant='ghost' onClick={onClose}>
							Отмена
						</Button>
						<Button onClick={onSave} className='gap-2'>
							<Check size={18} /> Готово
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default CropModal;
