'use client';

import { useState } from 'react';
import {
	CreateProjectForm,
	useProjectForm,
	CreateProjectActions,
	ViewModal,
} from '@/features/create-project';
import { TeamStack } from '@/widgets';
import { useWatch } from 'react-hook-form';

const CreateProjectPage = () => {
	const [openModal, setOpenModal] = useState(false);

	const {
		form,
		submitForm,
		isFetching,
		isSubmitting,
		error: apiError,
	} = useProjectForm();
	const {
		handleSubmit,
		control,
		register,
		formState: { errors },
	} = form;

	const onSubmit = async data => {
		await submitForm(data);
	};

	const watchedData = useWatch({
		control,
		defaultValue: form.getValues(),
	});

	return (
		<main className='container-wide py-10'>
			{!isFetching && (
				<div className='flex flex-col lg:flex-row gap-10 items-start'>
					<div className='grow w-full'>
						<CreateProjectForm
							control={control}
							register={register}
							errors={errors}
						/>
					</div>

					<aside className='w-full lg:w-[320px] shrink-0 sticky top-10 flex flex-col gap-6'>
						<CreateProjectActions
							isSubmitting={isSubmitting}
							handleSubmit={handleSubmit(onSubmit)}
							setOpenModal={setOpenModal}
						/>
						<TeamStack button='addNew' teamList={[]} />
					</aside>
					<ViewModal
						watchedData={watchedData}
						openModal={openModal}
						setOpenModal={setOpenModal}
					/>
				</div>
			)}
		</main>
	);
};


export default CreateProjectPage;
