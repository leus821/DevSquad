import { RichTextDisplay, Skill } from '@/shared/ui';

const Vacancy = ({ vacancy }) => {
	return (
		<div className='pl-8 pr-6'>
			<RichTextDisplay content={vacancy.description} />
			<h3 className='text-xl font-semibold mt-4 mb-2'>Технологический стек</h3>
			<ul className='flex flex-wrap gap-2'>
				{vacancy.stack.map((item, index) => (
					<li key={index}>
						<Skill className='text-base' skillName={item} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default Vacancy;
