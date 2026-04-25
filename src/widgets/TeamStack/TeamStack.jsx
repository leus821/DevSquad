import { TeamList } from '@/entities/team';
import { Button, Quantity } from '@/shared/ui';

const TeamStack = ({ teamList, button = 'viewAll' }) => {
	return (
		<div className='px-7 py-4 card'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='font-semibold text-xl'>Команда</h3>
				<Quantity quantity={teamList.length} text='участников' />
			</div>
			{teamList.length > 0 && <TeamList teamList={teamList} />}
			<Button className='w-full' variant='secondary'>
				{button === 'viewAll' ? 'Смотреть всех' : 'Добавить участника'}
			</Button>
		</div>
	);
};

export default TeamStack;
