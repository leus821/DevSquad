import { getShortProjectName } from '@/shared/lib/utils/getShortProjectName';

const ProjectLogo = ({ text }) => {
	return (
		<div className='w-45 flex-all-center aspect-square bg-black border-[#A78BFA] border-2 rounded-xl'>
			<h2 className='text-[50px] font-bold text-center leading-14'>
				{getShortProjectName(text)}
			</h2>
		</div>
	);
};

export default ProjectLogo;
