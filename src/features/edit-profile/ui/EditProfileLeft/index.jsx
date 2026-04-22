import InfoBlock from './InfoBlock';
import SocialsBlock from './SocialsBlock';
import StatusBlock from './StatusBlock';

const EditProfileLeft = ({ errors, control }) => {
	return (
		<aside className='flex flex-col gap-6'>
			<StatusBlock errors={errors} control={control} />
			<InfoBlock errors={errors} control={control} />
			<SocialsBlock errors={errors} control={control} />
		</aside>
	);
};

export default EditProfileLeft;
