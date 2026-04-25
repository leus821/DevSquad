import { MultiImageUploader, Quantity } from '@/shared/ui';

const CreateProjectGallery = ({ value, onChange, error }) => {
	return (
		<div className='card p-8'>
			<div className='flex justify-between items-center px-1'>
				<h3 className='text-white font-bold text-lg mb-2'>Галерея проекта</h3>
				<Quantity quantity={value.length} outOf={10} />
			</div>

			<MultiImageUploader
				value={value}
				onChange={onChange}
				error={error}
				maxFiles={10}
				aspect={16 / 9}
			/>
		</div>
	);
};

export default CreateProjectGallery;
