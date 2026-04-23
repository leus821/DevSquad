'use client';
import { CreateProjectForm } from '@/features/create-project';
import { Button } from '@/shared/ui';
import { Eye, UserPlus, Send, Save } from 'lucide-react';

const CreateProjectPage = () => {
	return (
		<main className='container-wide py-10'>
			{/* Навигация */}
			<div className='mb-6 text-sm text-header-icons font-medium'>
				<span className='hover:text-white cursor-pointer transition-colors'>
					Главная
				</span>{' '}
				/ Создание проекта
			</div>

			<div className='flex flex-col lg:flex-row gap-10 items-start'>
				{/* ЛЕВАЯ ЧАСТЬ - ФОРМА */}
				<div className='grow w-full'>
					<CreateProjectForm />
				</div>

				{/* ПРАВЫЙ САЙДБАР (Sticky) */}
				<aside className='w-full lg:w-[320px] shrink-0 sticky top-10 flex flex-col gap-6'>
					{/* Блок публикации */}
					<div className='card p-6 flex flex-col gap-4'>
						<h3 className='text-white font-bold text-lg'>Действия</h3>
						<Button size='lg' className='w-full justify-center gap-2'>
							<Send size={18} /> Опубликовать
						</Button>
						<div className='grid grid-cols-2 gap-2'>
							<Button
								variant='secondary'
								className='w-full justify-center gap-2'
							>
								<Eye size={16} /> Обзор
							</Button>
							<Button
								variant='secondary'
								className='w-full justify-center gap-2'
							>
								<Save size={16} /> Драфт
							</Button>
						</div>
					</div>

					{/* Блок команды */}
					<div className='card p-6 flex flex-col gap-4'>
						<div className='flex justify-between items-center'>
							<h3 className='text-white font-bold text-lg'>Команда</h3>
							<span className='text-xs font-bold text-header-icons px-2 py-1 border border-card-border rounded-md'>
								1 участник
							</span>
						</div>
						<Button variant='secondary' className='w-full justify-center gap-2'>
							<UserPlus size={18} /> Добавить участника
						</Button>
					</div>
				</aside>
			</div>
		</main>
	);
};

export default CreateProjectPage;
