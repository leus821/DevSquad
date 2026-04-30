'use client';
import { useParams } from 'next/navigation';
import { useProjectIdentity } from '@/entities/project';
import { useVacancyForm, VacancyForm } from '@/features/create-vacancy';
import { Button } from '@/shared/ui';
import { Eye, Save } from 'lucide-react';
import { Card } from '@/widgets';
import { useWatch } from 'react-hook-form';

const CreateVacancyPage = () => {
	const { id: projectId } = useParams();

	const { form, submitForm, isFetching, isSubmitting } =
		useVacancyForm(projectId);

	const { project: projectIdentity, loading: isProjectLoading } =
		useProjectIdentity(projectId);

	const isLoading = isFetching && isProjectLoading;

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = form;

	const onSubmit = () => {
		console.log('Публикация вакансии');
	};

	const watchedData = useWatch({
		control,
		defaultValue: form.getValues(),
	});

	console.log(watchedData);

	return (
		<main className='container-wide py-10'>
			{!isLoading && (
				<>
					<h1 className='text-3xl font-bold text-white tracking-tight mb-2'>
						Новая вакансия
					</h1>
					<div className='flex flex-col lg:flex-row gap-10 items-start'>
						<div className='grow w-full space-y-8'>
							<VacancyForm control={control} errors={errors} />
						</div>

						<aside className='w-full lg:w-[320px] shrink-0 sticky top-10 flex flex-col gap-6'>
							<div className='card p-6 flex flex-col gap-4'>
								<Button className='w-full gap-2 py-4'>
									<Save size={18} />
									{isSubmitting ? 'Публикация...' : 'Опубликовать'}
								</Button>

								<Button
									variant='secondary'
									onClick={() => setOpenModal(true)}
									className='w-full gap-2'
								>
									<Eye size={18} />
									Предпросмотр
								</Button>
							</div>

							{/* ЖИВОЕ ПРЕВЬЮ (Прямо в сайдбаре) */}
							{/* <Card
								title={projectIdentity?.name || 'Название'}
								description={watchedData?.hook || 'Введите описание'}
								imageUrl={watchedData?.thumbnail_url}
								vacancyRole={watchedData?.role || 'Введите роль'}
								vacancyExperience={watchedData?.experience}
								skills={watchedData?.skills}
								status={projectIdentity?.status}
							/> */}
						</aside>
					</div>
				</>
			)}
		</main>
	);
};

export default CreateVacancyPage;
