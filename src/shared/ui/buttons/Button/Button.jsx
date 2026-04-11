'use client';

import { cn } from '@/shared/lib/utils/commonUtils';
import { Slot } from '@radix-ui/react-slot';

const Button = ({
	children,
	className,
	variant = 'primary',
	asChild = false,
	...props
}) => {
	const Comp = asChild ? Slot : 'button';

	const variants = {
		primary: 'bg-primary',
		secondary:
			'bg-transparent neon-purple text-primary border-2 border-primary font-medium',
		ghost:
			'bg-transparent text-header-icons border border-transparent hover:bg-white/5 hover:text-white hover:border-card-border active:bg-white/10 active:scale-95',
	};

	return (
		<Comp
			className={cn(
				'flex-all-center p-2 rounded-xl',
				variants[variant],
				className,
			)}
			{...props}
		>
			{children}
		</Comp>
	);
};

export default Button;
