import { Button } from '@/shared/ui';

const CardVacancy = ({ role, experience }) => {
	return (
		<div className='ml-3 flex basis-[44%] shrink flex-col'>
			<div>
				<h2 className='font-medium pointer-events-auto leading-5.5 line-clamp-3 mb-2'>
					{role}
				</h2>
				<span className='block text-sm text-front'>{experience}</span>
			</div>
			<Button className='mt-auto w-full pointer-events-auto'>
				Откликнуться
			</Button>
		</div>
	);
};

export default CardVacancy;
