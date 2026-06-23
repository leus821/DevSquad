'use client';
import { useState } from 'react';
import { TeamList } from '@/entities/team';
import { Button, Modal, Quantity } from '@/shared/ui';
import { X } from 'lucide-react';

const TeamStack = ({ teamList, button = 'viewAll' }) => {
	const [isOpen, setIsOpen] = useState(false);
	const showViewAll = teamList.length > 3;

	return (
		<>
			<div className='px-7 py-4 card'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='font-semibold text-xl'>Команда</h3>
					<Quantity quantity={teamList.length} text='участников' />
				</div>
				{teamList.length > 0 && <TeamList teamList={teamList} />}
				{showViewAll && (
					<Button className='w-full' variant='secondary' onClick={() => setIsOpen(true)}>
						{button === 'viewAll' ? 'Смотреть всех' : 'Добавить участника'}
					</Button>
				)}
			</div>

			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				maxWidth='max-w-md'
				showCloseButton={false}
			>
				<div className='p-6'>
					<div className='flex items-center justify-between mb-6'>
						<h3 className='text-xl font-bold text-white'>Команда проекта</h3>
						<button
							onClick={() => setIsOpen(false)}
							className='text-header-icons hover:text-white transition-colors cursor-pointer'
						>
							<X size={20} />
						</button>
					</div>
					<div className='max-h-96 overflow-y-auto custom-scrollbar'>
						<TeamList teamList={teamList} />
						{teamList.length === 0 && (
							<p className='text-header-icons text-center py-10'>В команде пока никого нет</p>
						)}
					</div>
				</div>
			</Modal>
		</>
	);
};

export default TeamStack;
