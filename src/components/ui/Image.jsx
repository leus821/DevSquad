import { cn } from '@/lib/utils';

const Image = ({ className, ...props }) => {
	return (
		<div className={cn('overflow-hidden block', className)}>
			<img className='object-cover block' {...props} />
		</div>
	);
};

export default Image;
