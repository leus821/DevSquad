import { TeamList } from '@/entities/team';
import { Button } from '@/shared/ui';

const TeamStack = ({ teamList }) => {
	return (
		<div className='px-7 py-4 card'>
			<h3 className='font-semibold text-xl mb-4'>
				Команда ({teamList.length})
			</h3>
			<TeamList teamList={teamList} />
			<Button className='w-full' variant='secondary'>
				Смотреть всех
			</Button>
		</div>
	);
};

export default TeamStack;
