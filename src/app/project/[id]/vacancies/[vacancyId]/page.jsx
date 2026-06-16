'use client';
import { useWatch } from 'react-hook-form';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useProjectIdentity } from '@/entities/project';
import { useVacancyForm, VacancyForm } from '@/features/create-vacancy';
import { Button, Modal } from '@/shared/ui';
import { Eye, Save } from 'lucide-react';
import { VacancyCard } from '@/entities/vacancy';

const CreateVacancyPage = () => {
	const { id: projectId, vacancyId } = useParams();

	const isEditing = vacancyId && vacancyId !== 'create';

	const [isOpenModal, setIsOpenModal] = useState(false);

	const { form, submitForm, isFetching, isSubmitting, error } =
		useVacancyForm(projectId, vacancyId);

	const { project: projectIdentity, loading: isProjectLoading } =
		useProjectIdentity(projectId);

	const isLoading = isFetching && isProjectLoading;

	const {handleSubmit, control, formState: { errors },} = form;

	const onSubmit = async data => {
		await submitForm(data);
	};

	const watchedData = useWatch({
		control,
		defaultValue: form.getValues(),
	});

	return (
		<main className='container-wide py-10'>
			{!isLoading && (
				<>
					<h1 className='text-3xl font-bold text-white tracking-tight mb-2'>
						{isEditing ? 'Редактировать вакансию' : 'Новая вакансия'}
					</h1>
					<div className='flex flex-col lg:flex-row gap-10 items-start'>
						<div className='grow w-full space-y-8'>
							<VacancyForm control={control} errors={errors} />
						</div>

						<aside className='w-full lg:w-[320px] shrink-0 sticky top-10 flex flex-col gap-6'>
							<div className='card p-6 flex flex-col gap-4'>
								<Button
									onClick={handleSubmit(onSubmit)}
									className='w-full gap-2 py-4'
								>
									<Save size={18} />
									{isSubmitting ? 'Сохранение...' : (isEditing ? 'Сохранить изменения' : 'Опубликовать')}
								</Button>

								<Button
									variant='secondary'
									onClick={() => setIsOpenModal(true)}
									className='w-full gap-2'
								>
									<Eye size={18} />
									Предпросмотр
								</Button>
							</div>

							<Modal
								className='p-10 max-w-150 flex-all-center'
								isOpen={isOpenModal}
								onClose={() => setIsOpenModal(false)}
							>
								<VacancyCard
									className='max-w-200 w-full'
									title={projectIdentity?.name || 'Название'}
									description={watchedData?.hook || 'Введите описание'}
									imageUrl={watchedData?.thumbnail_url}
									vacancyRole={watchedData?.role || 'Введите роль'}
									vacancyExperience={watchedData?.experience}
									skills={watchedData?.skills}
									status={projectIdentity?.status}
								/>
							</Modal>
						</aside>
					</div>
				</>
			)}
		</main>
	);
};

export default CreateVacancyPage;
