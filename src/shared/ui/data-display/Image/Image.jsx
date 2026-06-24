'use client';
import { useState } from 'react';
import { cn } from '@/shared/lib/utils/commonUtils';
import { ImageOff } from 'lucide-react';

const Image = ({ className, ...props }) => {
	const [hasError, setHasError] = useState(false);

	if (hasError) {
		return (
			<div className={cn('flex items-center justify-center bg-black/20', className)}>
				<ImageOff size={24} className='text-header-icons/50' />
			</div>
		);
	}

	return (
		<div className={cn('overflow-hidden block', className)}>
			<img
				className='object-cover w-full h-full block'
				onError={() => setHasError(true)}
				{...props}
			/>
		</div>
	);
};

export default Image;
