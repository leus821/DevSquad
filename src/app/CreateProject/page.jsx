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
import { Loader2 } from 'lucide-react';

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

	if (isFetching) {
		return (
			<div className='min-h-[50vh] flex flex-all-center'>
				<Loader2 className='animate-spin text-brand-purple' size={40} />
			</div>
		);
	}

	return (
		<main className='container-wide py-10'>
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
			{apiError && (
				<div className='mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm'>
					{apiError}
				</div>
			)}
		</main>
	);
};

export default CreateProjectPage;
