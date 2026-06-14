'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered, Underline } from 'lucide-react';
import { cn } from '@/shared/lib/utils/commonUtils';
import { ErrorField, Quantity } from '@/shared/ui';
import CharacterCount from '@tiptap/extension-character-count';
import { useState, useEffect, useRef } from 'react';

const RichEditor = ({
	value,
	onChange,
	placeholder,
	error,
	maxLength = 2000,
}) => {
	const [characters, setCharacters] = useState(value ? value.length : 0);
	const isUserUpdate = useRef(false);

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				bulletList: {
					keepMarks: true,
					keepAttributes: false,
				},
				orderedList: {
					keepMarks: true,
					keepAttributes: false,
				},
			}),
			Placeholder.configure({
				placeholder: placeholder || 'Введите описание...',
			}),
			CharacterCount.configure({
				limit: maxLength,
			}),
		],
		content: value,
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			isUserUpdate.current = true;
			onChange(editor.getHTML());
			setCharacters(editor.storage.characterCount.characters());
		},
		editorProps: {
			attributes: {
				class: cn(
					'prose prose-invert max-w-none focus:outline-none min-h-[200px] p-5 text-white',
					'prose-ul:list-disc prose-ul:ml-4 prose-ol:list-decimal prose-ol:ml-4',
					'prose-li:my-0',
				),
			},
			transformPastedText(text) {
				return text.replace(/[\r\n]+/g, ' ');
			},
			transformPastedHTML(html) {
				return html.replace(/<\/p><p>/g, ' ').replace(/<br\s*\/?>/g, ' ');
			},
		},
	});

	useEffect(() => {
		if (editor && value !== editor.getHTML() && !isUserUpdate.current) {
			editor.commands.setContent(value || '');
		}
		isUserUpdate.current = false;
	}, [value, editor]);

	if (!editor) return null;

	return (
		<div>
			<div
				className={cn(
					'w-full bg-input border rounded-2xl overflow-hidden transition-all',
					error
						? 'border-red-500'
						: 'border-card-border focus-within:border-brand-purple',
				)}
			>
				{/* Панель инструментов */}
				<div className='flex items-center gap-1 p-2 border-b border-card-border bg-black/20'>
					<MenuButton
						onClick={() => editor.chain().focus().toggleBold().run()}
						active={editor.isActive('bold')}
						icon={Bold}
					/>
					<MenuButton
						onClick={() => editor.chain().focus().toggleItalic().run()}
						active={editor.isActive('italic')}
						icon={Italic}
					/>
					<MenuButton
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						active={editor.isActive('underline')}
						icon={Underline}
					/>
					<div className='w-px h-4 bg-card-border mx-1' />

					{/* Кнопка ненумерованного списка */}
					<MenuButton
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						active={editor.isActive('bulletList')}
						icon={List}
					/>

					{/* Кнопка нумерованного списка */}
					<MenuButton
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						active={editor.isActive('orderedList')}
						icon={ListOrdered}
					/>
				</div>

				<EditorContent editor={editor} />
			</div>
			<div className='flex justify-between items-center'>
				{error && <ErrorField errorText={error.message} />}
				<Quantity className='ml-auto' quantity={characters} outOf={maxLength} />
			</div>
		</div>
	);
};

const MenuButton = ({ onClick, active, icon: Icon }) => (
	<button
		type='button'
		onClick={onClick}
		className={cn(
			'p-2 rounded-lg transition-colors',
			active
				? 'bg-brand-purple text-white'
				: 'text-header-icons hover:bg-white/5 hover:text-white',
		)}
	>
		<Icon size={18} />
	</button>
);

export default RichEditor;
