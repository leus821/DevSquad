'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Quote } from 'lucide-react';
import { cn } from '@/shared/lib/utils/commonUtils';

const RichEditor = ({ value, onChange, placeholder, error }) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: value,
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class:
					'prose prose-invert max-w-none focus:outline-none min-h-[200px] p-5 text-white',
			},
		},
	});

	if (!editor) return null;

	return (
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
				<div className='w-px h-4 bg-card-border mx-1' />
				<MenuButton
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					active={editor.isActive('bulletList')}
					icon={List}
				/>
				<MenuButton
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					active={editor.isActive('orderedList')}
					icon={ListOrdered}
				/>
			</div>

			<EditorContent editor={editor} />
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
