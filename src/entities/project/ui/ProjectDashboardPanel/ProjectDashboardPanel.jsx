import Link from 'next/link';
import { Button, StatItem } from '@/shared/ui';
import { Mail, Users } from 'lucide-react';
import { TeamAvatars } from '@/entities/team';

const ProjectDashboardPanel = ({ totalResponses, team, projectId }) => {
	return (
		<div className='grid grid-cols-5 gap-4 items-center'>
			<div className='flex col-span-2 gap-3 border-r border-card-border pr-4 h-full items-center'>
				<Button className='w-1/2 py-2' variant='secondary' asChild={true}>
					<Link href={`/editproject/${projectId}`}>Редактировать</Link>
				</Button>
				<Button asChild={true} className='w-1/2 py-2.5'>
					<Link href={`/project/${projectId}/vacancies`}>Вакансии</Link>
				</Button>
			</div>

			<div className='flex items-center col-span-2 gap-4 border-r border-card-border'>
				<TeamAvatars users={team} />
			</div>

			<div className='pl-4 col-span-1'>
				<StatItem icon={Mail} value={totalResponses} label='откликов' />
			</div>
		</div>
	);
};

export default ProjectDashboardPanel;
