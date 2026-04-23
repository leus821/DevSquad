import Link from 'next/link';
import { ProjectHeader } from '@/widgets';
import { ProjectDashboardPanel } from '@/entities/project';
import { MOCK_PROJECT } from '@/shared/static/mock_data';
import { Plus } from 'lucide-react';
import { Button, Container } from '@/shared/ui';

const MyProjects = () => {
	return (
		<section>
			<Container>
				<div className='flex justify-between mb-5'>
					<h1 className='title mb-4'>Мои проекты (1 из 3)</h1>
					<Button asChild={true} className='gap-2 my-1'>
						<Link href='CreateProject'>
							<Plus size={18} />
							Создать новый
						</Link>
					</Button>
				</div>
				<ProjectHeader isDashboard={true}>
					<ProjectDashboardPanel
						team={MOCK_PROJECT.team}
						stats={MOCK_PROJECT.stats}
					/>
				</ProjectHeader>
			</Container>
		</section>
	);
};

export default MyProjects;
