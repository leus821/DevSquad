import { Skill } from '@/shared/ui';

const MAX_VISIBLE_SKILLS = 2;

const CardProjectInfo = ({ title, description, skills }) => {
	const visibleSkills = skills?.slice(0, MAX_VISIBLE_SKILLS) || [];
	const extraCount = (skills?.length || 0) - MAX_VISIBLE_SKILLS;

	return (
		<div className='flex-[92%] border-r-card-border border-r wrap-break-word flex min-w-0 flex-col gap-y-1'>
			<h2 className='font-extrabold text-[18px] pointer-events-auto line-clamp-2'>
				{title}
			</h2>
			<p className='text-front text-sm mb-2 pointer-events-auto line-clamp-3 break-words'>
				{description}
			</p>
			<div className='flex gap-x-2 mt-auto items-center'>
				{visibleSkills.map((item, index) => (
					<li key={index} className='list-none'>
						<Skill skillName={item} />
					</li>
				))}
				{extraCount > 0 && (
					<span className='text-xs text-header-icons font-bold ml-1'>
						+{extraCount}
					</span>
				)}
			</div>
		</div>
	);
};

export default CardProjectInfo;
