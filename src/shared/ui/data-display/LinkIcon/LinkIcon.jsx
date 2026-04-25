import { cn } from '@/shared/lib/utils/commonUtils';
import { detectLinkData } from '@/shared/lib/utils/linkDetector';
import { Globe } from 'lucide-react';

const LinkIcon = ({
	withLinkName = true,
	linkName = '',
	className,
	url,
	size = 20,
}) => {
	const { icon: DetectedIcon, isSocial } = detectLinkData(url);

	return (
		<div
			className={cn(
				'bg-input rounded-xl text-header-icons group-focus-within:text-brand-purple transition-colors',
				className,
			)}
		>
			{DetectedIcon ? <DetectedIcon size={size} /> : <Globe size={20} />}
			{withLinkName && !isSocial && !linkName ? 'Сайт' : linkName}
		</div>
	);
};

export default LinkIcon;
