'use client';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, LinkIcon, RemoveButton } from '@/shared/ui';
import { cn } from '@/shared/lib/utils/commonUtils';

const LinksEditor = ({
	value = [],
	onChange,
	maxLinks = 5,
	errors = [],
	className,
}) => {
	const addLink = () => {
		if (value.length < maxLinks) {
			
			onChange([...value, { id: Date.now().toString(), label: '', url: '' }]);
		}
	};

	const removeLink = id => {
		onChange(value.filter(item => item.id !== id));
	};

	const updateLink = (id, field, newValue) => {
		const updated = value.map(item =>
			item.id === id ? { ...item, [field]: newValue } : item,
		);
		onChange(updated);
	};

	return (
		<div className={cn('w-full space-y-6', className)}>
			<div className='flex flex-col gap-3'>
				<AnimatePresence mode='popLayout'>
					{value.map((link, index) => (
						<motion.div
							key={link.id} 
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95 }}
							className='group flex items-center gap-4 p-4 rounded-2xl bg-white/2 border border-card-border hover:border-brand-purple/30 transition-all'
						>
							<LinkIcon withLinkName={false} url={link.url} />

							<div className='w-1/4'>
								<Input
									label='Название'
									value={link.label}
									onChange={e => updateLink(link.id, 'label', e.target.value)}
									placeholder='Напр: Сайт'
									className='bg-transparent p-0 focus:bg-transparent rounded-none border-0'
									error={errors?.[index]?.label}
									watchValue={link.label}
									maxLength={15}
									required={true}
								/>
							</div>

							<div className='h-8 w-px bg-card-border shrink-0' />

							<div className='flex-1'>
								<Input
									label='Ссылка (URL)'
									value={link.url}
									onChange={e => updateLink(link.id, 'url', e.target.value)}
									placeholder='https://...'
									className='bg-transparent p-0 focus:bg-transparent rounded-none border-0'
									error={errors?.[index]?.url}
									required={true}
								/>
							</div>

							<RemoveButton
								type='uncolored'
								onClick={() => removeLink(link.id)}
							/>
						</motion.div>
					))}
				</AnimatePresence>

				{value.length < maxLinks && (
					<button
						type='button'
						onClick={addLink}
						className='w-full py-4 border-2 border-dashed border-card-border rounded-2xl text-header-icons hover:text-brand-purple hover:border-brand-purple/50 hover:bg-brand-purple/5 transition-all flex items-center justify-center gap-2 group'
					>
						<Plus
							size={18}
							className='group-hover:scale-110 transition-transform'
						/>
						<span className='text-sm font-bold uppercase tracking-widest'>
							Добавить еще одну ссылку
						</span>
					</button>
				)}
			</div>
		</div>
	);
};

export default LinksEditor;
