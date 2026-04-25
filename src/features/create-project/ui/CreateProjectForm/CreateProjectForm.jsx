'use client';

import CreateProjectFormHeader from './CreateProjectFormHeader';
import CreateProjectAbout from './CreateProjectAbout';
import CreateProjectGallery from './CreateProjectGallery';
import CreateProjectFormLinks from './CreateProjectFormLinks';
import { Controller } from 'react-hook-form';

const CreateProjectForm = ({ control, errors, register }) => {
	return (
		<form className='flex flex-col gap-10 pb-24'>
			<CreateProjectFormHeader
				register={register}
				errors={errors}
				control={control}
			/>

			<CreateProjectAbout errors={errors} control={control} />

			<Controller
				name='gallery'
				control={control}
				render={({ field }) => (
					<CreateProjectGallery
						value={field.value || []}
						onChange={field.onChange}
						error={errors?.gallery}
					/>
				)}
			/>

			<CreateProjectFormLinks control={control} errors={errors} />
		</form>
	);
};

export default CreateProjectForm;
