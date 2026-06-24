import { getShortProjectName } from '@/shared/lib/utils/getShortProjectName';
import { Image } from '@/shared/ui';

const ProjectLogo = ({ url, text }) => {
	return (
		<div className='w-45 flex-all-center overflow-hidden aspect-square bg-black border-[#A78BFA] border-2 rounded-xl'>
			{url ? (
				<Image className='aspect-square' src={url} />
			) : text ? (
				<h2 className='text-[50px] font-bold text-center leading-14'>
					{getShortProjectName(text)}
				</h2>
			) : (
				<h2 className='text-[50px] font-bold text-center leading-14 text-white/10'>
					?
				</h2>
			)}
		</div>
	);
};

export default ProjectLogo;
