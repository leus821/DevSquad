import CardVacancy from '@/components/ui/card/CardVacancy';
import CardImage from '@/components/ui/card/CardImage';
import CardLink from '@/components/ui/card/CardLink';
import CardProject from '@/components/ui/card/CardProject';

const ProjectCard = ({
	title,
	description,
	imageUrl,
	vacancyRole,
	vacancyExperience,
	skills,
	status,
	isBookmarked,
	type = 'feed',
}) => {
	return (
		<article className='relative group bg-card border-card-border border-2 rounded-xl overflow-hidden flex flex-col h-full'>
			<CardLink href={`/projects`} />

			<div className='relative z-10 pointer-events-none flex flex-col h-full'>
				<CardImage imageUrl={imageUrl} status={status} />
				<div className='flex flex-1 px-3 py-1 items-stretch gap-0'>
					<CardProject
						title={title}
						description={description}
						skills={skills}
					/>
					<CardVacancy role={vacancyRole} experience={vacancyExperience} />
				</div>
			</div>
		</article>
	);
};

export default ProjectCard;
