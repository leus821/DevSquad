
import RoadMapStep from './RoadMapStep/RoadMapStep';
import { Progress } from '@/shared/ui/shadcn/progress';

const ProjectRoadMap = ({ steps }) => {
	const activeItem = steps?.find(item => item.isActive === true);

	const progressValue = !activeItem
		? 0
		: activeItem?.number === 1
			? 0
			: activeItem?.number === 2
				? 50
				: 100;

	return (
		<div className='p-10'>
			<div className='flex justify-between relative'>
				{steps.map((item, index) => (
					<div key={index} className='flex flex-col items-center'>
						<div className='mb-1'>
							<span>{item.date}: </span>
							<span className='text-[#EAA72B]'>{item.status}</span>
						</div>
						<RoadMapStep className='w-13 z-10' isCompleted={item.isCompleted} />
					</div>
				))}
				<Progress
					className='h-1 absolute right-0 left-0 top-[60%] w-[85%] mx-auto -translate-x-3 bg-card-border'
					value={progressValue}
				/>
			</div>
		</div>
	);
};

export default ProjectRoadMap;
