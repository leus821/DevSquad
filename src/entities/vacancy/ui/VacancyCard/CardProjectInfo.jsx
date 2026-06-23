import { Skill } from '@/shared/ui';

const MAX_VISIBLE_SKILLS = 3;

const CardProjectInfo = ({ title, description, skills }) => {
	const visible = skills?.slice(0, MAX_VISIBLE_SKILLS) || [];
	const extra = (skills?.length || 0) - MAX_VISIBLE_SKILLS;

	return (
		<div className='flex-[92%] border-r-card-border border-r wrap-break-word flex min-w-0 flex-col gap-y-1'>
			<h2 className='font-extrabold text-[18px] pointer-events-auto line-clamp-2'>
				{title}
			</h2>
			<p className='text-front break-all text-sm mb-2 pointer-events-auto line-clamp-3'>
				{description}
			</p>
			<div className='flex items-center gap-x-2 mt-auto flex-wrap'>
				{visible.map((item, index) => (
					<Skill key={index} skillName={item} />
				))}
				{extra > 0 && (
					<span className='inline-flex items-center px-3 py-1 rounded-full border bg-white/5 border-card-border text-header-icons text-sm font-mono whitespace-nowrap'>
						+{extra}
					</span>
				)}
			</div>
		</div>
	);
};

export default CardProjectInfo;
