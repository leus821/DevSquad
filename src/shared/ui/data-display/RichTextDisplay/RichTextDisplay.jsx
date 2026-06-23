
import { cn } from '@/shared/lib/utils/commonUtils';

const RichTextDisplay = ({ content, className }) => {
	if (!content) return null;

	return (
		<div
			className={cn(
				
				
				'prose prose-invert prose-sm md:prose-base max-w-none',
				
				'prose-headings:text-white prose-strong:text-white prose-p:text-header-icons',
				'prose-li:text-header-icons prose-bullet:bg-brand-purple',
				className,
			)}
			
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
};

export default RichTextDisplay;
