const ProjectText = ({ description, idea, approach }) => {
	return (
		<div className='flex flex-col gap-2 py-4 pl-8 pr-6'>
			<h3 className='text-xl font-semibold'>Описание</h3>
			<p className='text-front'>{description}</p>
			<h3 className='text-xl font-semibold'>Идея проекта</h3>
			<p className="text-front relative italic leading-relaxed before:content-[''] before:absolute before:-left-4 before:top-1 before:bottom-1 before:w-1 before:bg-primary before:z-10 before:rounded-full">
				{idea}
			</p>
			<h3 className='text-xl font-semibold'>Наш подход</h3>
			<p className='text-front'>{approach}</p>
		</div>
	);
};

export default ProjectText;
