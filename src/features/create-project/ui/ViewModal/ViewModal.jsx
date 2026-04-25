import { Modal } from '@/shared/ui';
import { Accordion } from '@/shared/ui/shadcn/accordion';
import { ProjectHeader, ProjectInfoBlock, TeamStack } from '@/widgets';

const ViewModal = ({ openModal, setOpenModal, watchedData }) => {
	const linksValue =
		watchedData?.links?.length === 0
			? [{ url: 'example.com', label: 'Ссылка на сайт или соц.сеть' }]
			: watchedData.links;

	return (
		<Modal
			className='mx-auto max-w-300 p-10 w-full'
			isOpen={openModal}
			onClose={() => setOpenModal(false)}
		>
			<div className='mx-auto max-w-300 w-full'>
				<ProjectHeader
					slogan={watchedData?.slogan || 'Тут будет ваш слоган'}
					links={linksValue}
					projectName={watchedData?.name || 'Название'}
					status={watchedData?.status || 'idea'}
				/>
				<div className='flex gap-7'>
					<Accordion
						defaultValue={['project']}
						type='multiple'
						className='w-[75%] rounded-xl flex flex-col gap-7'
					>
						<ProjectInfoBlock
							idea={watchedData?.idea || 'Тут будет ваша идея'}
							description={watchedData?.description || 'Тут будет описание'}
							approach={watchedData?.approach || 'Тут будет подход'}
							gallery={watchedData?.gallery}
						/>
					</Accordion>
					<div className='w-1/4 '>
						<TeamStack teamList={[]} />
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ViewModal;
