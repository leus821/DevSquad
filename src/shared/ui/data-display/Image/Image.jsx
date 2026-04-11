import { cn } from '@/shared/lib/utils/commonUtils';

const Image = ({ className, ...props }) => {
	return (
		<div className={cn('overflow-hidden block', className)}>
			<img className='object-cover w-full h-full block' {...props} />
		</div>
	);
};

export default Image;
