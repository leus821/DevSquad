import VacancyMainInfo from './VacancyMainInfo';
import VacancyViewFeed from './VacancyViewFied';
import VacancyDescription from './VacancyDescription';

const VacancyForm = ({ control, errors }) => {
	return (
		<div className='flex flex-col gap-10'>
			<VacancyMainInfo control={control} errors={errors} />

			<VacancyViewFeed control={control} errors={errors} />

			<VacancyDescription control={control} errors={errors} />
		</div>
	);
};

export default VacancyForm;
