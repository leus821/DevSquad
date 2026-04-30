import { usePathname } from 'next/navigation';
import { Button } from '@/shared/ui';
import { Eye, Send } from 'lucide-react';

const CreateProjectActions = ({ handleSubmit, isSubmitting, setOpenModal }) => {
	const pathname = usePathname();
	const isCreating = pathname.toLowerCase().includes('create');

	const buttonText = isCreating ? 'Создать' : 'Изменить';

	return (
		<div className='card p-6 flex flex-col gap-4'>
			<h3 className='text-white font-bold text-lg'>Действия</h3>
			<Button onClick={handleSubmit} className='w-full justify-center gap-2'>
				<Send size={18} /> {!isSubmitting ? buttonText : 'Сохраняем...'}
			</Button>
			<Button
				onClick={() => setOpenModal(true)}
				variant='secondary'
				className='w-full justify-center gap-2'
			>
				<Eye size={16} /> Обзор
			</Button>
		</div>
	);
};

export default CreateProjectActions;
