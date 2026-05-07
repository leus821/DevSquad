import CardVacancy from './CardVacancy';
import CardLink from './CardLink';
import CardProjectInfo from './CardProjectInfo';
import { VacancyImage } from '@/entities/vacancy';
import { cn } from '@/shared/lib/utils/commonUtils';

const VacancyCard = ({
	projectTitle,
	description,
	imageUrl,
	vacancyRole,
	vacancyExperience,
	skills,
	status,
	className,
	vacancyId,
}) => {
	return (
		<article
			className={cn(
				'relative group bg-card border-card-border border-2 rounded-xl overflow-hidden flex flex-col h-full',
				className,
			)}
		>
			<CardLink href={`/vacancy/${vacancyId}`} />

			<div className='relative z-10 pointer-events-none flex flex-col h-full'>
				<VacancyImage imageUrl={imageUrl} status={status} />
				<div className='flex flex-1 px-3 py-1 items-stretch gap-0'>
					<CardProjectInfo
						title={projectTitle}
						description={description}
						skills={skills}
					/>
					<CardVacancy role={vacancyRole} experience={vacancyExperience} />
				</div>
			</div>
		</article>
	);
};

export default VacancyCard;
