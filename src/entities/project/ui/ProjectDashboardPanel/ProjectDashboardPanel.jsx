import Link from 'next/link';
import { Button, StatItem } from '@/shared/ui';
import { Mail, Users } from 'lucide-react';
import { TeamAvatars } from '@/entities/team';

const ProjectDashboardPanel = ({
	team,
	projectId,
	onDelete,
	isDeleting,
}) => {
	return (
		<div className='grid grid-cols-12 gap-4 items-center'>
			<div className='flex col-span-4 gap-3 border-r border-card-border pr-4 h-full items-center'>
				<Button className='w-1/2 py-2' variant='secondary' asChild={true}>
					<Link href={`/editproject/${projectId}`}>Редактировать</Link>
				</Button>
				<Button asChild={true} className='w-1/2 py-2.5'>
					<Link href={`/project/${projectId}/vacancies`}>Вакансии</Link>
				</Button>
			</div>

			<div className='flex items-center col-span-5 gap-3 border-r border-card-border'>
				<TeamAvatars users={team} />
			</div>

			<div className='flex items-center justify-center col-span-1'>
				<StatItem icon={Users} value={team?.length || 0} label='' />
			</div>

			<div className='pl-4 col-span-2'>
				<Button
					variant='ghost'
					onClick={onDelete}
					disabled={isDeleting}
					className='text-red-500 hover:bg-red-500/10 hover:border-red-500/30 gap-2 w-full py-2.5 border border-transparent'
				>
					{isDeleting ? 'Удаление...' : 'Удалить проект'}
				</Button>
			</div>
		</div>
	);
};

export default ProjectDashboardPanel;
