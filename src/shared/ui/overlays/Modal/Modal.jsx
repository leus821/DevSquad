'use client';
import { useEffect, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/shared/lib/utils/commonUtils'; // Импортируем cn

const Modal = ({
	isOpen,
	onClose,
	children,
	title,
	maxWidth = 'max-w-lg',
	showCloseButton = true,
	className,
}) => {
	const [mounted, setMounted] = useState(false);

	const modalRef = useRef(null);

	const handleKeyDown = useCallback(
		e => {
			if (e.key === 'Escape') {
				onClose();
			}
		},
		[onClose],
	);

	useEffect(() => {
		setMounted(true);
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, handleKeyDown]);

	if (!isOpen) return null;

	 if (!mounted || !isOpen) return null;

	return createPortal(
		<div className='fixed inset-0 z-100 flex items-center justify-center p-4'>
			{/* Overlay */}
			<div
				className='fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200'
				onClick={onClose}
			/>

			{/* Content */}
			<div
				ref={modalRef}
				className={cn(
					'relative w-full bg-deep-dark border border-card-border rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in duration-200',
					maxWidth,
					className,
				)}
			>
				{(title || showCloseButton) && (
					<div
						className={cn(
							'flex items-center justify-between p-4',
							title
								? 'border-b border-card-border'
								: 'absolute right-0 top-0 z-20',
						)}
					>
						{title && (
							<h3 className='text-lg font-semibold text-white'>{title}</h3>
						)}
						{showCloseButton && (
							<button
								onClick={onClose}
								className='p-1 text-header-icons hover:text-white transition-colors bg-deep-dark/50 rounded-full'
							>
								<X size={20} />
							</button>
						)}
					</div>
				)}
				<div>{children}</div>
			</div>
		</div>,
		document.body,
	);
};

export default Modal;
