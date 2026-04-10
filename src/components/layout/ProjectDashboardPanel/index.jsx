import TeamStack from '@/components/entities/user/TeamStack';
import Button from '@/components/ui/Button';
import StatItem from '@/components/ui/StatItem';
import { Eye, Mail } from 'lucide-react';

const ProjectDashboardPanel = ({ stats, team }) => {
	return (
		<div className='grid grid-cols-5 gap-4 items-center'>
			<div className='flex col-span-2 gap-3 border-r border-card-border pr-4 h-full items-center'>
				<Button className='w-1/2 py-2' variant='secondary'>
					Редактировать
				</Button>
				<Button className='w-1/2 py-2.5'>Вакансии</Button>
			</div>

			<div className='flex items-center col-span-2 gap-4 border-r border-card-border'>
				<TeamStack users={team} />
				<Button variant='ghost'>+ Добавить участника</Button>
			</div>

			<div className='pl-4 col-span-1'>
				<StatItem icon={Eye} value={stats.views} label='просмотров' />
				<StatItem
					icon={Mail}
					value={stats.totalResponses - stats.newResponses}
					label='новых откликов'
					color='green'
				/>
			</div>
		</div>
	);
};

export default ProjectDashboardPanel;
