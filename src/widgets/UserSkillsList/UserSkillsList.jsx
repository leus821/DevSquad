import { Skill } from '@/shared/ui';

const UserSkillsList = ({ skills }) => {
	return (
		<ul className='flex flex-wrap gap-3'>
			{skills?.map(skill => (
				<li key={skill}>
					<Skill
						key={skill}
						skillName={skill}
						className='px-5 py-2 text-base'
					/>
				</li>
			)) || <p className='text-header-icons italic text-sm'>Стек не указан</p>}
		</ul>
	);
};

export default UserSkillsList;
