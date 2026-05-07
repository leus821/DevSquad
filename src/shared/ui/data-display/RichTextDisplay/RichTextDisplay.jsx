// src/shared/ui/data-display/RichTextDisplay/RichTextDisplay.jsx
import { cn } from '@/shared/lib/utils/commonUtils';

const RichTextDisplay = ({ content, className }) => {
	if (!content) return null;

	return (
		<div
			className={cn(
				// prose-invert адаптирует стили под темную тему
				// prose-sm или prose-base настраивает размер текста
				'prose prose-invert prose-sm md:prose-base max-w-none',
				// Стили для ссылок и списков (чтобы они были в твоем цвете)
				'prose-headings:text-white prose-strong:text-white prose-p:text-header-icons',
				'prose-li:text-header-icons prose-bullet:bg-brand-purple',
				className,
			)}
			// Вот главный атрибут для вставки HTML
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
};

export default RichTextDisplay;
