import Skill from '../Skill';

const CardProjectInfo = ({ title, description, skills }) => {
	return (
		<div className='flex-[92%] border-r-card-border border-r flex flex-col gap-y-1'>
			<h2 className='font-extrabold text-[18px] pointer-events-auto line-clamp-2'>
				{title}
			</h2>
			<p className='text-front text-sm mb-2 pointer-events-auto line-clamp-3'>
				{description}
			</p>
			<div className='flex gap-x-2 mt-auto'>
				{skills.map((item, index) => (
					<li key={index}>
						<Skill skillName={item} />
					</li>
				))}
			</div>
		</div>
	);
};

export default CardProjectInfo;
