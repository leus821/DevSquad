'use client';

import { cn } from '@/lib/utils';
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
		secondary: 'bg-transparent neon-purple text-primary border-2 border-primary font-medium',
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
