import { cn } from '@/shared/lib/utils/commonUtils';

const Container = ({ children, className }) => {
	return (
		<div className={cn(`w-full container-wide ${className}`)}>{children}</div>
	);
};

export default Container;
